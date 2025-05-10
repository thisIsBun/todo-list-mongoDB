import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Todo', todoSchema);
