import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';

@Resolver(() => CourseSectionEntity)
export class SectionResolver {
    constructor() {}

    @ResolveField(() => [CourseModuleEntity], {
        description: 'Subitems of the course section',
    })
    courseModules(@Parent() section: CourseSectionEntity) {
        return section.modules;
    }
}
