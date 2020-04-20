const mongoose = require('mongoose');
const uuid = require('uuid');

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: null
    },
    boardId: {
      type: String,
      default: null
    },
    columnId: {
      type: String,
      default: null
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

TaskSchema.statics.toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
