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
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'jnhbgvfc',
            database: 'uitbuoy',
            synchronize: false,
            autoLoadEntities: true,
        }),
        UserModule,
        AuthModule,
        ApiModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ApiService,
        {
            provide: APP_FILTER,
            useClass: BaseExceptionFilter,
        },
    ],
})
export class AppModule {}
