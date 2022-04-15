import { createRedisClient } from "./redis.client";

describe("createRedisClient", () => {
    const url = "redis://default:password@awesome.redis.server:6379";

    it("should return the Redis client", () => {
        const redisClient = createRedisClient({ 
            url: url,
        });
        expect(typeof redisClient).toEqual("object");
    });
});