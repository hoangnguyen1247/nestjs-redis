import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { REDIS_TOKEN } from "./redis.constants";
import { RedisClientType, RedisOptions, RedisOptionsFactory } from "./redis.interfaces";
import { RedisModule } from "./redis.module";

describe("RedisModule", () => {
    const url = "redis://default:password@awesome.redis.server:6379";

    class TestService implements RedisOptionsFactory {
        createRedisOptions(): RedisOptions {
            return {
                url,
            };
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule { }

    describe("forRoot", () => {
        it("should provide the Redis client", async () => {
            const module = await Test.createTestingModule({
                imports: [RedisModule.forRoot({ 
                    url, 
                })],
            }).compile();

            const redisClient = module.get<RedisClientType>(REDIS_TOKEN);
            expect(redisClient).toBeDefined();
            expect(typeof redisClient).toEqual("object");
        });
    });

    describe("forRootAsync", () => {
        describe("when the `useFactory` option is used", () => {
            it("should provide the Redis client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        RedisModule.forRootAsync({
                            useFactory: () => ({ 
                                url 
                            }),
                        }),
                    ],
                }).compile();

                const redisClient = module.get<RedisClientType>(REDIS_TOKEN);
                expect(redisClient).toBeDefined();
                expect(typeof redisClient).toEqual("object");
            });
        });

        describe("when the `useExisting` option is used", () => {
            it("should provide the Redis client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        RedisModule.forRootAsync({
                            imports: [TestModule],
                            useExisting: TestService,
                        }),
                    ],
                }).compile();

                const redisClient = module.get<RedisClientType>(REDIS_TOKEN);
                expect(redisClient).toBeDefined();
                expect(typeof redisClient).toEqual("object");
            });
        });

        describe("when the `useClass` option is used", () => {
            it("should provide the Redis client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        RedisModule.forRootAsync({
                            useClass: TestService,
                        }),
                    ],
                }).compile();

                const redisClient = module.get<RedisClientType>(REDIS_TOKEN);
                expect(redisClient).toBeDefined();
                expect(typeof redisClient).toEqual("object");
            });
        });
    });
});