import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { BaseException } from '../errors/base.error';
import { GraphQLError } from 'graphql';
import { LoggerService } from 'src/logger/logger.service';

@Catch()
export class BaseExceptionFilter implements GqlExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    catch(exception: BaseException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        gqlHost.getContext().res;
        this.loggerService.error(exception.code, exception.code, exception);
        throw new GraphQLError(exception.message, {
            extensions: { ...exception },
        });
    }
}
