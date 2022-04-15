import { InjectRedis } from "nestjs-redis";

export class AppService {
    constructor(
        @InjectRedis() private readonly redisClient,
    ) {}
}