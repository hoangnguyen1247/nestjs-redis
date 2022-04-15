import { ModuleMetadata, Type } from "@nestjs/common";
import { createClient, RedisClientOptions } from "redis";

export type RedisOptions = RedisClientOptions;

export interface RedisOptionsFactory {
    createRedisOptions(): RedisOptions | Promise<RedisOptions>;
}

export interface RedisAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[],
    useClass?: Type<RedisOptionsFactory>,
    useExisting?: Type<RedisOptionsFactory>,
    useFactory?: (...args: any[]) => RedisOptions | Promise<RedisOptions>,
}

export type RedisClientType = ReturnType<typeof createClient>;