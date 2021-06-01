import mongoose, { Schema } from 'mongoose';

const ResourceSchema = new Schema({
  organizationName: { type: String },
  location: { type: String },
  poc: { type: String },
  pocemail: { type: String },
  website: { type: String },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const ResourceModel = mongoose.model('Resource', ResourceSchema);

export default ResourceModel;
