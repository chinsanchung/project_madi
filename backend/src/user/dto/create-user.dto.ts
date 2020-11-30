import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  // @IsString()
  // readonly googleId: string;
  // @IsString()
  // readonly kakaoId: string;
  // @IsString()
  // readonly githubId: string;
}
// @IsOptional()
// @IsString({each:true});
// readonly genres: string[]
