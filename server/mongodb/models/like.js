// Assuming you're using Mongoose for MongoDB
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

const Like = new mongoose.model('Like', likeSchema);

export default Like