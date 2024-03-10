import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthEntity {
  @Field()
  token: string;

  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  fullname: string;
}
