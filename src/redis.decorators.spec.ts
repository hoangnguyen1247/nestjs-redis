import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RedisClientType } from "./redis.interfaces";
import { InjectRedis } from "./redis.decorators";
import { RedisModule } from "./redis.module";

describe("InjectRedis", () => {
    const url = "redis://default:password@awesome.redis.server:6379";
    let module: TestingModule;

    @Injectable()
    class TestService {
        public constructor(@InjectRedis() public readonly redisClient: RedisClientType) { }
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                RedisModule.forRoot({ 
                    url: url, 
                }),
            ],
            providers: [TestService],
        }).compile();
    });

    describe("when decorating a class constructor parameter", () => {
        it("should inject the Redis client", () => {
            const testService = module.get(TestService);
            expect(testService).toHaveProperty("redisClient");
            expect(typeof testService.redisClient).toEqual("object");
        });
    });
});