import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Mentor from '../models/mentor_model';

dotenv.config({ silent: true });

// encodes a new token for a org object
function tokenForMentor(mentor) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: mentor.id, iat: timestamp }, process.env.AUTH_SECRET);
}
export const signin = (mentor) => {
  return tokenForMentor(mentor);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({
  email, password, firstName, lastName, hometown, organization, foster, path, bio,
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingMentor = await Mentor.findOne({ email });
  if (existingMentor) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  // 🚀 TODO:
  // here you should use the Mentor model to create a new user.
  const mentor = new Mentor();
  mentor.email = email;
  mentor.password = password;
  mentor.firstName = firstName;
  mentor.lastName = lastName;
  mentor.hometown = hometown;
  mentor.organization = organization;
  mentor.foster = foster;
  mentor.path = path;
  mentor.bio = bio;
  // this is similar to how you created a Post
  // and then save and return a token
  await mentor.save();
  // use this part to send the id???
  return ({
    token: tokenForMentor(mentor),
    ID: mentor._id,
  });
};

export const getMentors = async () => {
  try {
    // await finding paths
    const mentors = await Mentor.find({});
    // return paths
    return mentors;
  } catch (error) {
    throw new Error(`get mentors error: ${error}`);
  }
  // return posts
};

export const getMentor = async (id) => {
  try {
    // await finding one path
    const mentor = await Mentor.findById(id).exec();
    // return path
    return mentor;
  } catch (error) {
    throw new Error(`get mentor error: ${error}`);
  }
};

export const updateMentor = async (id, fields) => {
  try {
    // await updating a post by id
    const options = { new: true };
    const mentor = await Mentor.findByIdAndUpdate(id, fields, options);
    // return *updated* post
    return mentor;
  } catch (error) {
    throw new Error(`update mentor error: ${error}`);
  }
};
