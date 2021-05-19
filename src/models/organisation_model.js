import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const OrganisationSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  name: { type: String },
  donationRoute: { type: String },
  purpose: { type: String },
  bio: { type: String },
  location: { type: String },
  events: { type: Array },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});
OrganisationSchema.pre('save', async function beforeUserSave(next) {
  // get access to the user model
  const org = this;

  if (!org.isModified('password')) return next();

  try {
    // salt, hash, then set password to hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(org.password, salt);
    org.password = hash;
    return next();
    // else catch error
  } catch (error) {
    return next(error);
  }
});

// note use of named function rather than arrow notation
OrganisationSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

// create model class
const OrganisationModel = mongoose.model('Organisation', OrganisationSchema);

export default OrganisationModel;
