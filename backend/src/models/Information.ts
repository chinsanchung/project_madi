import mongoose, { Document, Schema } from "mongoose";

interface InformationProp extends Document {
  recipe_id: string;
  title: string;
  description: string;
  nation: string;
  type: string;
  cooking_time: string;
  img_url: string;
  detail_url: string;
}

const schema = new Schema(
  {
    recipe_id: String,
    title: String,
    description: String,
    nation: String,
    type: String,
    cooking_time: String,
    img_url: String,
    detail_url: String,
  },
  { collection: "information" }
);

const model = mongoose.model<InformationProp>("information", schema);

export default model;
