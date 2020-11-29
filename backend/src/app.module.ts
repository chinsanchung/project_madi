import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUrl } from './constants';
// `nest g mo`로 유저, 레시피 모듈을 따로 만들어서 거기에 넣기로
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: mongoUrl,
      }),
    }),
    UserModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
