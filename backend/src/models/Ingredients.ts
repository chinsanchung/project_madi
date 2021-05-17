import mongoose, { Document, Schema } from "mongoose";

interface IngredientsProp extends Document {
  recipe_id: string;
  name: string;
  capacity: string;
}

const schema = new Schema(
  {
    recipe_id: { type: String, ref: "information" },
    name: String,
    capacity: String,
  },
  { collection: "ingredients" }
);

const model = mongoose.model<IngredientsProp>("ingredients", schema);

export default model;
