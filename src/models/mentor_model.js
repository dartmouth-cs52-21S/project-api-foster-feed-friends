import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const MentorSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  hometown: { type: String },
  organization: { type: String },
  foster: { type: Boolean },
  path: { type: Schema.Types.ObjectId, ref: 'Path' },
  bio: { type: String },

}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});
MentorSchema.pre('save', async function beforeUserSave(next) {
  // get access to the user model
  const mentor = this;

  if (!mentor.isModified('password')) return next();

  try {
    // salt, hash, then set password to hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(mentor.password, salt);
    mentor.password = hash;
    return next();
    // else catch error
  } catch (error) {
    return next(error);
  }
});

// note use of named function rather than arrow notation
MentorSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

const MentorModel = mongoose.model('Mentor', MentorSchema);

export default MentorModel;
