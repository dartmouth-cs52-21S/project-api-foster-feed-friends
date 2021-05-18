import mongoose, { Schema } from 'mongoose';

const MentorSchema = new Schema({
  fullName: { type: String },
  hometown: { type: String },
  former: { type: Boolean },
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

// create model class
const MentorModel = mongoose.model('Mentor', MentorSchema);

export default MentorModel;
