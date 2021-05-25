import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  hometown: { type: String },
  age: { type: String },
  messaged: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
  }],
  path: { type: Schema.Types.ObjectId, ref: 'Path' },

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
UserSchema.pre('save', async function beforeUserSave(next) {
  // get access to the user model
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    // salt, hash, then set password to hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
    // else catch error
  } catch (error) {
    return next(error);
  }
});

// note use of named function rather than arrow notation
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
