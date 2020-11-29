import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
