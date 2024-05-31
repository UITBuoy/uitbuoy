import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';
import * as winstonMongoDB from 'winston-mongodb';
import { AppController, AppResolver } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { EnvironmentType } from './config/type';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            imports: [ConfigModule],
            inject: [ConfigService],
            driver: ApolloDriver,
            useFactory: async (configService: ConfigService) => ({
                autoSchemaFile: join(
                    configService.get<string>('ENVIRONMENT') === 'development'
                        ? process.cwd()
                        : '/tmp',
                    '/schema.gql',
                ),
                playground: {
                    settings: {
                        'request.credentials': 'include',
                    },
                },
                // cors: {
                //     origin: '*',
                //     credentials: true,
                // },
                context: ({ req, res }) => ({
                    req,
                    res,
                }),
                sortSchema: true,
                formatError: (error) => ({
                    message: error.message,
                    ...error.extensions,
                    path: error.path,
                }),
            }),
        }),
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
                // synchronize:
                //     configService.get<EnvironmentType>('ENVIRONMENT') ==
                //     'development',
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
        LoggerModule,
        CommonModule,
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule {}
