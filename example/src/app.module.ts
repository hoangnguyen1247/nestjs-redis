import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from "nestjs-redis";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                url: configService.get('REDIS_URL'),
            }),
        }),
    ],
    providers: [AppService],
})
export class AppModule {

}