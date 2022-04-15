import { createClient } from "redis";
import { RedisOptions } from "./redis.interfaces";

export function createRedisClient(options: RedisOptions) {
    const redisClient = createClient(options);

    return redisClient;
}