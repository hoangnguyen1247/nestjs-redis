import { Inject } from "@nestjs/common";
import { REDIS_TOKEN } from "./redis.constants";

export function InjectRedis() {
    return Inject(REDIS_TOKEN);
}
