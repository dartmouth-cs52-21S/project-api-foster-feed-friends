import Mentor from '../models/mentor_model';

export const getMentors = async () => {
  try {
    // await finding paths
    const Mentors = await Mentor.find({});
    // return paths
    return Mentors;
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
