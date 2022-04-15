import { InjectRedis } from "@hoangnguyen1247/nestjs-redis";

export class AppService {
    constructor(
        @InjectRedis() private readonly redisClient,
    ) {}
}