import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  name: { type: String },
  date: { type: String },
  time: { type: String },
  location: { type: String },
  coordinator: { type: String },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
