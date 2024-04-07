import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { GoogleUser } from '../entities/google-user.entity';

@InputType()
export class CreateGoogleUserInput extends OmitType(
    GoogleUser,
    ['events'],
    InputType,
) {}
