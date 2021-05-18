import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  fullName: { type: String },
  hometown: { type: String },
  category: { type: String },
  former: { type: Boolean },
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

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
