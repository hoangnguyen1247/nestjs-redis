import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { RedisOptions, RedisAsyncOptions, RedisOptionsFactory } from "./redis.interfaces";
import { createRedisClient } from "./redis.client";
import { REDIS_TOKEN, REDIS_OPTIONS } from "./redis.constants";

@Global()
@Module({})
export class RedisCoreModule {

    public static forRoot(options: RedisOptions): DynamicModule {
        const redisClient: Provider = {
            provide: REDIS_TOKEN,
            useValue: createRedisClient(options),
        };

        return {
            exports: [redisClient],
            module: RedisCoreModule,
            providers: [redisClient],
        };
    }

    public static forRootAsync(asyncOptions: RedisAsyncOptions): DynamicModule {
        const redisClient: Provider = {
            inject: [REDIS_OPTIONS],
            provide: REDIS_TOKEN,
            useFactory: (options: RedisOptions) => createRedisClient(options),
        };

        return {
            exports: [redisClient],
            imports: asyncOptions.imports,
            module: RedisCoreModule,
            providers: [...this.createAsyncProviders(asyncOptions), redisClient],
        };
    }

    private static createAsyncProviders(options: RedisAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createAsyncOptionsProvider(
        options: RedisAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: REDIS_OPTIONS,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: [options.useExisting || options.useClass],
            provide: REDIS_OPTIONS,
            useFactory: (optionsFactory: RedisOptionsFactory) =>
                optionsFactory.createRedisOptions(),
        };
    }
}
