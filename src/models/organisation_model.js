import mongoose, { Schema } from 'mongoose';

const OrganisationSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  name: { type: String },
  donationRoute: { type: Array },
  purpose: { type: String },
  bio: { type: String },
  location: { type: String },
  events: { type: Array },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const OrganisationModel = mongoose.model('Organisation', OrganisationSchema);

export default OrganisationModel;
