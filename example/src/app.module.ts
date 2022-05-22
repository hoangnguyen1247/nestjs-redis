import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from "@hoangnguyen1247/nestjs-redis";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        RedisModule.forRootAsync({
            imports: [],
            useFactory: (configService: ConfigService) => ({
                url: configService.get('REDIS_URL'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AppService],
})
export class AppModule {

}