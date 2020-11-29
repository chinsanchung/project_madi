import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('recipe')
export class RecipeController {
  // nest 는 import 가 아니라 constructor 로 서비스 요청
  constructor(private readonly recipeService: RecipeService) {}

  // @Get('search')
  // search(@Query('name') recipeName: string) {
  //   return `Search Result - name: ${recipeName}`;
  // }

  @Get()
  getList(): Recipe[] {
    return this.recipeService.getList();
  }
  @Get(':id')
  getOne(@Param('id') recipeId: number): Recipe {
    return this.recipeService.getOne(recipeId);
  }
  @Post()
  create(@Body() recipeData) {
    return this.recipeService.create(recipeData);
  }
  @Patch(':id')
  patch(@Param('id') recipeId: number, @Body() updateData) {
    return this.recipeService.update(recipeId, updateData);
  }
  @Delete()
  deleteOne(@Param('id') recipeId: number) {
    return this.recipeService.deleteOne(recipeId);
  }

  // Get(':id') 보다 위에 search 배치하기. 다른 Get() 이 작동하질 않는 문제 방지
}
