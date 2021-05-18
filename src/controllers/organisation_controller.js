import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Organisation from '../models/organisation_model';

dotenv.config({ silent: true });

// encodes a new token for a org object
function tokenForOrganisation(organisation) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: organisation.id, iat: timestamp }, process.env.AUTH_SECRET);
}
export const signin = (organisation) => {
  return tokenForOrganisation(organisation);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({
  email, password, fullName, location, bio, purpose, donationRoute,
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingOrg = await Organisation.findOne({ email });
  if (existingOrg) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  // 🚀 TODO:
  // here you should use the User model to create a new user.
  const org = new Organisation();
  org.email = email;
  org.password = password;
  org.fullName = fullName;
  org.location = location;
  org.purpose = purpose;
  org.donationRoute = donationRoute;
  // this is similar to how you created a Post
  // and then save and return a token
  await org.save();

  // verify this part for the id???
  return { token: tokenForOrganisation(org), id: org.id };
};

export const updateProfile = async (id, fields) => {
  try {
    // await updating a post by id
    const options = { new: true };
    const org = await Organisation.findByIdAndUpdate(id, fields, options);
    // return *updated* post
    return org;
  } catch (error) {
    throw new Error(`update error: ${error}`);
  }
};
export const getOrganisations = async () => {
  try {
    // await finding paths
    const orgs = await Organisation.find({});
    // return paths
    return orgs;
  } catch (error) {
    throw new Error(`get orgs error: ${error}`);
  }
  // return posts
};

export const getOrganisation = async (id) => {
  try {
    // await finding one path
    const org = await Organisation.findById(id).exec();
    // return path
    return org;
  } catch (error) {
    throw new Error(`get org error: ${error}`);
  }
};
