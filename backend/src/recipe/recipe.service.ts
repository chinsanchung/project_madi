import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
// import mongoose from 'mongoose';

@Injectable()
export class RecipeService {
  private recipe: Recipe[] = [];

  getList(): Recipe[] {
    return this.recipe;
  }
  getOne(id: number): Recipe {
    const recipe = this.recipe.find((item) => item.serialNumber === id);
    if (!recipe) {
      throw new NotFoundException(`Not Found RecipeId: ${id}`);
    }
    return recipe;
    // const objectId = mongoose.Types.ObjectId(id);
    // return this.recipe.find((item) => item._id === objectId);
  }
  create(recipeData: CreateRecipeDto) {
    this.recipe.push({
      serialNumber: this.recipe.length + 1,
      ...recipeData,
    });
  }
  update(id: number, updateData) {
    const recipe = this.getOne(id);
    this.deleteOne(id);
    this.recipe.push({ ...recipe, ...updateData });
  }
  deleteOne(id: number) {
    this.getOne(id);
    this.recipe = this.recipe.filter((item) => item.serialNumber !== id);
  }
}

// 참고 string 으로 전송되는 123 숫자변환:  parseInt('id') 와 +id 은 동일
