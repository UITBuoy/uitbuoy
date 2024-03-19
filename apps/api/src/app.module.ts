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
import { CalenderModule } from './calender/calender.module';
import { EventModule } from './envent/event.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentType } from './config/type';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), '/schema.gql'),
            playground: true,
            sortSchema: true,
            formatError: (error) => ({
                message: error.message,
                ...error.extensions,
                path: error.path,
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
            }),
        }),
        UserModule,
        AuthModule,
        ApiModule,
        SubjectModule,
        CourseModule,
        HealthModule,
        CalenderModule,
        EventModule,
        LoggerModule,
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
