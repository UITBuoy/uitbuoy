import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './guards/google-oauth2.guard';

@Controller('auth')
export class AuthController {
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: 'Google Authentication' };
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect(@Req() req: Request) {
        return { msg: 'OK' };
    }
}
