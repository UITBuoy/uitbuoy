import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { ApiService } from './api/api.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BaseExceptionFilter } from './common/filters/base-exception.filter';
import { SubjectModule } from './subject/subject.module';
import { CourseModule } from './course/course.module';
import { HealthModule } from './health/health.module';
import { ShutdownService } from './common/services/shutdown.service';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './envent/event.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentType } from './config/type';
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonMongoDB from 'winston-mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturerModule } from './lecturer/lecturer.module';

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
                playground: true,
                sortSchema: true,
                formatError: (error) => ({
                    message: error.message,
                    ...error.extensions,
                    path: error.path,
                }),
                context: ({ req }: { req: Request }) => ({ req }),
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
                synchronize:
                    configService.get<EnvironmentType>('ENVIRONMENT') ==
                    'development',
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
        UserModule,
        AuthModule,
        ApiModule,
        SubjectModule,
        CourseModule,
        HealthModule,
        CalendarModule,
        EventModule,
        LoggerModule,
        LecturerModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ApiService,
        ShutdownService,
        {
            provide: APP_FILTER,
            useClass: BaseExceptionFilter,
        },
    ],
})
export class AppModule {}
