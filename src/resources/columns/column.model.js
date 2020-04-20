const mongoose = require('mongoose');
const uuid = require('uuid');

const ColumnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

ColumnSchema.statics.toResponse = ({ id, title, order }) => ({
  id,
  title,
  order
});

module.exports = {
  model: mongoose.model('Column', ColumnSchema),
  schema: ColumnSchema
};
