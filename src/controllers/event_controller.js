import Event from '../models/event_model';
import User from '../models/user_model';

export const createEvent = async (eventFields) => {
  // await creating an event
  const event = new Event();
  event.name = eventFields.name;
  event.date = eventFields.date;
  event.time = eventFields.time;
  event.location = eventFields.location;
  event.coordinator = eventFields.coordinator;
  // return event
  try {
    // await saving an event
    const savedEvent = await event.save();
    console.log(savedEvent);
    return savedEvent;
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
};

export const getEvent = async (id) => {
  try {
    // await finding one event
    const event = await Event.findById(id).exec();
    // return event
    return event;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
};

export const getEvents = async (id) => {
  try {
    // await finding one event
    const user = await User.findById(id);
    const events = await Event.find({ _id: { $in: user.events } });
    // return event
    return events;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
};

export const updateEvent = async (id, fields) => {
  try {
    // await updating an event by id
    const options = { new: true };
    const event = await Event.findByIdAndUpdate(id, fields, options);
    // return *updated* event object
    return event;
  } catch (error) {
    throw new Error(`update error: ${error}`);
  }
};

export const removeEvent = async (id) => {
  try {
    // await in deleting an event
    const event = await Event.findByIdAndRemove(id);
    // return the event
    return event;
  } catch (error) {
    throw new Error(`update error: ${error}`);
  }
};
