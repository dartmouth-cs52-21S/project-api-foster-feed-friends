import Path from '../models/path_model';

export const createPath = async (pathFields) => {
  // await creating a path
  const path = new Path();
  path.name = pathFields.name;
  path.resources = pathFields.resources;
  // return path
  try {
    // await creating a path
    const savedpath = await path.save();
    return savedpath;
  } catch (error) {
    throw new Error(`create path error: ${error}`);
  }
};
export const getPaths = async () => {
  try {
    // await finding paths
    const paths = await Path.find({});
    // return paths
    return paths;
  } catch (error) {
    console.log(error);
    throw new Error(`get paths error: ${error}`);
  }
  // return posts
};
export const getPath = async (id) => {
  try {
    // await finding one path
    const path = await Path.findById(id).exec();
    // return path
    return path;
  } catch (error) {
    throw new Error(`get path error: ${error}`);
  }
};
export const deletePath = async (id) => {
  try {
    // await deleting a path
    await Path.findByIdAndDelete(id);
    // return confirmation
    return 'success';
  } catch (error) {
    throw new Error(`delete path error: ${error}`);
  }
  // return confirmation
};
export const updatePath = async (id, pathFields) => {
  try {
    // await updating a post by id
    const options = { new: true };
    const path = await Path.findByIdAndUpdate(id, pathFields, options);
    // return *updated* path
    return path;
  } catch (error) {
    throw new Error(`update error: ${error}`);
  }
};
