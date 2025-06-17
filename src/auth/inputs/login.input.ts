import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required.' })
  @Length(6, 128, {
    message: 'Invalid length of Password, minimum 8 characters & maximum 128.',
  })
  password: string;
}
