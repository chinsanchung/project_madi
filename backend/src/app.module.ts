import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { AppController } from './app.controller';

// `nest g mo`로 유저, 레시피 모듈을 따로 만들어서 거기에 넣기로
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    UserModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
