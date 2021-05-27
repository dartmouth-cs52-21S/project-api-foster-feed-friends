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
export const signup = async ({
  email, password, firstName, lastName, age, hometown,
}) => {
  console.log('signup');
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  // 🚀 TODO:
  // here you should use the User model to create a new user.
  const user = new User();
  user.email = email;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;
  user.hometown = hometown;
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
    // return youth user
    return user;
  } catch (error) {
    throw new Error(`get youth error: ${error}`);
  }
};
