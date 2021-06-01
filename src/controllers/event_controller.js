import Event from '../models/event_model';
import User from '../models/user_model';

export const createEvent = async (eventFields) => {
  // await creating a path
  console.log(eventFields);
  const event = new Event();
  event.name = eventFields.name;
  event.date = eventFields.date;
  event.time = eventFields.time;
  event.location = eventFields.location;
  event.coordinator = eventFields.coordinator;
  // return path
  try {
    // await creating a path
    const savedEvent = await event.save();
    console.log(savedEvent);
    return savedEvent;
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
};

export const getEvent = async (id) => {
  try {
    // await finding one path
    const event = await Event.findById(id).exec();
    // return path
    return event;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
};

export const getEvents = async (id) => {
  try {
    // await finding one path
    const user = await User.findById(id);
    const events = await Event.find({ _id: { $in: user.events } });
    // return path
    return events;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
};
