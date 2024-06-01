import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentType } from './config/type';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import * as winstonMongoDB from 'winston-mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ecsFormat } from '@elastic/ecs-winston-format';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                '.env',
                '.env.local',
                '.env.test.local',
                '.env.production.local',
                '.env.development.local',
            ],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres' as 'postgres',
                host: configService.get<string>('MAIN_DB_HOST'),
                port: parseInt(configService.get<string>('MAIN_DB_PORT')),
                username: configService.get<string>('MAIN_DB_USERNAME'),
                password: configService.get<string>('MAIN_DB_PASSWORD'),
                database: configService.get<string>('MAIN_DB_NAME'),
                synchronize: true,
                autoLoadEntities: true,
                ssl:
                    configService.get<EnvironmentType>('ENVIRONMENT') ===
                    'production',
                extra:
                    configService.get<EnvironmentType>('ENVIRONMENT') ===
                    'production'
                        ? {
                              ssl: {
                                  rejectUnauthorized: false,
                              },
                          }
                        : undefined,
            }),
        }),
        WinstonModule.forRootAsync({
            imports: [
                ConfigModule,
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        uri: configService.get<string>(
                            'LOGGER_DB_CONNECTION_URI',
                        ),
                    }),
                }),
            ],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                format: ecsFormat({ convertReqRes: true }),
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.colorize(),
                            winston.format.printf(
                                ({
                                    timestamp,
                                    level,
                                    message,
                                    context,
                                    trace,
                                }) => {
                                    return `[Winston] - ${new Intl.DateTimeFormat(
                                        'en-GB',
                                        {
                                            dateStyle: 'short',
                                            timeStyle: 'long',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        },
                                    ).format(
                                        new Date(timestamp),
                                    )} - [${context}] ${level}: ${message}`;
                                },
                            ),
                        ),
                    }),
                    new winstonMongoDB.MongoDB({
                        level: 'info',
                        db: configService.get<string>(
                            'LOGGER_DB_CONNECTION_URI',
                        ),
                        options: {
                            useUnifiedTopology: true,
                        },
                        collection: 'logs',
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.json(),
                            winston.format.metadata(),
                        ),
                    }),
                ],
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
