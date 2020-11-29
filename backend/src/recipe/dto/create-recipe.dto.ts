import { IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  readonly name: string;
}
// 배열 @IsString({each: true}) readonly ingredients: string[]
