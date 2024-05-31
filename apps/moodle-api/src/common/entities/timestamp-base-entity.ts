import { ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TimeStampBaseEntity {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
