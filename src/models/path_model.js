import mongoose, { Schema } from 'mongoose';

const PathSchema = new Schema({
  name: { type: String },
  resources: { type: Array },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const PathModel = mongoose.model('Path', PathSchema);

export default PathModel;
