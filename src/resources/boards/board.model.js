const mongoose = require('mongoose');
const uuid = require('uuid');

const { schema } = require('../columns/column.model');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [schema],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = ({ id, title, columns }) => ({
  id,
  title,
  columns
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
