import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
    onApplicationShutdown(signal: string) {
        console.log(signal);
    }
}
