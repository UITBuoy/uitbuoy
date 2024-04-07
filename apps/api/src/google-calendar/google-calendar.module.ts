import { forwardRef, Module } from '@nestjs/common';
import { GoogleCalendarResolver } from './google-calendar.resolver';
import { GoogleCalendarService } from './google-calendar.service';
import { EventModule } from '@/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleCalendarEvent } from './entities/google-calendar-event.entity';
import { UserModule } from '@/user/user.module';

@Module({
    imports: [
        EventModule,
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([GoogleCalendarEvent]),
    ],
    providers: [GoogleCalendarResolver, GoogleCalendarService],
})
export class GoogleCalendarModule {}
