import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { CalenderResolver } from './calender.resolver';
import { CalenderService } from './calender.service';
import { Calender } from './entities/calender.entity';
import { Event } from 'src/envent/entities/event.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forFeature([Calender, Event]),
        UserModule,
    ],
    providers: [CalenderService, CalenderResolver],
    exports: [CalenderService],
})
export class CalenderModule {}
