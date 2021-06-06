import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
export const signin = (user) => {
  return tokenForUser(user);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async (fields) => {
  console.log('signup');
  if (!fields.email || !fields.password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email: fields.email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  // 🚀 TODO:
  // here you should use the User model to create a new user.
  const user = new User();
  user.email = fields.email;
  user.password = fields.password;
  user.firstName = fields.firstName;
  user.lastName = fields.lastName;
  user.age = fields.age;
  user.hometown = fields.hometown;
  user.messaged = fields.messaged;
  user.path = fields.path;
  user.pocname = fields.pocname;
  user.donationRoute = fields.donationRoute;
  user.purpose = fields.purpose;
  user.bio = fields.bio;
  user.location = fields.location;
  user.events = fields.events;
  user.organization = fields.organization;
  user.foster = fields.foster;
  user.careerPath = fields.careerPath;
  user.type = fields.type;
  user.orgname = fields.orgname;
  user.momentsPath = fields.momentsPath;
  user.name = fields.name;
  // this is similar to how you created a Post
  // and then save and return a token
  await user.save();
  return ({
    token: tokenForUser(user),
    ID: user._id,
  });
};

export const updateUser = async (id, fields) => {
  try {
    // await updating a post by id
    const options = { new: true };
    const user = await User.findByIdAndUpdate(id, fields, options).populate('Path');
    // return *updated* user object
    return user;
  } catch (error) {
    throw new Error(`update error: ${error}`);
  }
};

export const getUser = async (id) => {
  try {
    // await finding one youth user
    const user = await User.findById(id).exec();
    console.log(user);
    // return youth user
    return user;
  } catch (error) {
    throw new Error(`get youth error: ${error}`);
  }
};

export const getUsers = async () => {
  try {
    // await finding orgs
    const orgs = await User.find({});
    // return orgs
    return orgs;
  } catch (error) {
    throw new Error(`get orgs error: ${error}`);
  }
  // return all organisations
};

export const getEvents = async (id) => {
  try {
    const org = await User.findById(id).populate('events');
    return org.events;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getOrganisations = async () => {
  try {
    // await finding orgs
    const orgs = await User.find({ type: 'org' });
    console.log(orgs);
    // return orgs
    return orgs;
  } catch (error) {
    throw new Error(`get orgs error: ${error}`);
  }
  // return all organisations
};

export const getMentors = async () => {
  try {
    const mentors = await User.find({ type: 'mentor' });
    return mentors;
  } catch (error) {
    throw new Error(`get orgs error: ${error}`);
  }
};

export const getYouths = async () => {
  try {
    const mentors = await User.find({ type: 'youth' });
    return mentors;
  } catch (error) {
    throw new Error(`get orgs error: ${error}`);
  }
};

export const getMessagedMentors = async (id) => {
  try {
    // await finding one path
    const user = await User.findById(id);
    console.log(user);
    const mentors = await User.find({ _id: { $in: user.messaged } });
    // return path
    return mentors;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
};

export const getAll = async () => {
  try {
    const mentors = await User.find({ type: 'mentor' });
    const orgs = await User.find({ type: 'org' });
    return { mentors, orgs };
  } catch (error) {
    throw new Error(`get all error: ${error}`);
  }
};
