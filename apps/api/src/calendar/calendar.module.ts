import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Event } from 'src/envent/entities/event.entity';
import { UserModule } from 'src/user/user.module';
import { CalendarResolver } from './calendar.resolver';
import { CalendarService } from './services/calendar.service';
import { Calendar } from './entities/calendar.entity';
import { CalendarApiService } from './services/calender-api.service';

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forFeature([Calendar, Event]),
        UserModule,
    ],
    providers: [CalendarService, CalendarApiService, CalendarResolver],
    exports: [CalendarService, CalendarApiService],
})
export class CalendarModule {}
