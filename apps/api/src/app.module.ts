import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './api/api.service';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), '/schema.gql'),
            playground: true,
            sortSchema: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
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
    providers: [AppService, ApiService],
})
export class AppModule {}
