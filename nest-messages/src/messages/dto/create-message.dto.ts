import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  content: string;
}
