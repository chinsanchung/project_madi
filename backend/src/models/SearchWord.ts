import mongoose, { Document, Schema } from "mongoose";

interface SearchWordProp extends Document {
  name: string;
}

const schema = new Schema(
  {
    name: String,
  },
  { collection: "searchword" }
);

const model = mongoose.model<SearchWordProp>("searchword", schema);

export default model;
