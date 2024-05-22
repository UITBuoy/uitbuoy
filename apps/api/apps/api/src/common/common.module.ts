import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';

@Module({
    providers: [TokenService],
    exports: [TokenService],
})
export class CommonModule {}
