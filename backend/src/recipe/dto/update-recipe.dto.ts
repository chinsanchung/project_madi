import { IsString } from 'class-validator';

export class UpdateRecipeDto {
  @IsString()
  readonly name?: string;
}
// 배열 @IsString({each: true}) readonly ingredients: string[]
