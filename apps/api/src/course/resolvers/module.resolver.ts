import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseContentEntity } from '../entities/course-content.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';

@Resolver(() => CourseModuleEntity)
export class ModuleResolver {
    constructor() {}

    @ResolveField(() => [CourseContentEntity], {
        nullable: true,
        description: 'All files/contents in the current module',
    })
    courseContents(@Parent() module: CourseModuleEntity) {
        return module.contents;
    }
}
