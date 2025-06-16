import {IsEmail, IsNotEmpty, IsString, Length, MaxLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    maxLength:50
  })
    @IsString({message: 'Name must be a string'})
    @IsNotEmpty({message: "Name is required."})
    @MaxLength(50, {message: "Name must be at least 50 characters"})
    name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@yahoo.com',
  })
    @IsString({message: 'Email must be a string'})
    @IsNotEmpty({message: "Email is required."})
    @IsEmail({}, {message: "Please enter a valid email address."})
    email: string;

  @ApiProperty({
    description: 'User password',
    example: 'examplePassword12',
    minLength: 8,
    maxLength: 128
  })
    @IsString({message: 'Password must be a string'})
    @IsNotEmpty({message: "Password is required."})
    @Length(6, 128, {message: "Invalid length of Password, minimum 8 characters & maximum 128."})
    password: string;
}

