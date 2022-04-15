import { DynamicModule, Module } from "@nestjs/common";
import { RedisOptions, RedisAsyncOptions } from "./redis.interfaces";
import { RedisCoreModule } from "./redis-core.module";

@Module({})
export class RedisModule {

    public static forRoot(options: RedisOptions): DynamicModule {
        return {
            module: RedisModule,
            imports: [RedisCoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: RedisAsyncOptions): DynamicModule {
        return {
            module: RedisModule,
            imports: [RedisCoreModule.forRootAsync(options)],
        };
    }
}