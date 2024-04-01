import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';
import { CourseContentEntity } from '../entities/course-content.entity';

@Resolver(() => CourseModuleEntity)
export class ModuleResolver {
    constructor() {}

    @ResolveField(() => [CourseContentEntity])
    courseContents(@Parent() module: CourseModuleEntity) {
        return module.contents;
    }
}
