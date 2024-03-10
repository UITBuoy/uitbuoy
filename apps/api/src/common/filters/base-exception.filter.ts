import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { BaseException } from '../errors/base.error';
import { GraphQLError } from 'graphql';

@Catch()
export class BaseExceptionFilter implements GqlExceptionFilter {
    catch(exception: BaseException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        throw new GraphQLError(exception.message, {
            extensions: { ...exception },
        });
    }
}
