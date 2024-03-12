import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Course {}
