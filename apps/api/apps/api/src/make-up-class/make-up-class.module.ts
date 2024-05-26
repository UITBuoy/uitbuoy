import { CourseModule } from '@/course/course.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeUpClass } from './entities/make-up-class.entity';
import { MakeUpClassResolver } from './make-up-class.resolver';
import { MakeUpClassApiService } from './services/make-up-class-api.service';
import { MakeUpClassService } from './services/make-up-class.service';

@Module({
    imports: [CourseModule, TypeOrmModule.forFeature([MakeUpClass])],
    providers: [MakeUpClassResolver, MakeUpClassService, MakeUpClassApiService],
    exports: [MakeUpClassService, MakeUpClassApiService],
})
export class MakeUpClassModule {}
