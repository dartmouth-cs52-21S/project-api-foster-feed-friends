import Mentor from '../models/mentor_model';

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

export const createMentor = async (fields) => {
  // await creating a path
  const mentor = new Mentor();
  mentor.fullName = fields.fullName;
  mentor.hometown = fields.hometown;
  mentor.bio = fields.bio;
  console.log(mentor);
  // return path
  try {
    // await creating a path
    const savedmentor = await mentor.save();
    return savedmentor;
  } catch (error) {
    throw new Error(`create mentor error: ${error}`);
  }
};
