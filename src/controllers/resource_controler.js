import Resource from '../models/resource_model';

export const createResource = async (resourceFields) => {
  // await creating a resource
  const Resources = new Resource();
  Resources.organizationName = resourceFields.organizationName;
  Resources.location = resourceFields.location;
  Resources.poc = resourceFields.poc;
  Resources.pocemail = resourceFields.pocemail;
  Resources.website = resourceFields.website;
  // return path
  try {
    // await saving a resource
    const savedResource = await Resources.save();
    return savedResource;
  } catch (error) {
    throw new Error(`create resource error: ${error}`);
  }
};
export const getResources = async () => {
  try {
    // await finding paths
    const resource = await Resource.find({});
    // return paths
    return resource;
  } catch (error) {
    console.log(error);
    throw new Error(`get resource error: ${error}`);
  }
};
export const getResource = async (id) => {
  try {
    // await finding one resource
    const resource = await Resource.findById(id).exec();
    // return resource
    return resource;
  } catch (error) {
    throw new Error(`get resource error: ${error}`);
  }
};
export const deleteResource = async (id) => {
  try {
    // await deleting a paths
    await Resource.findByIdAndDelete(id);
    // return confirmation
    return 'success';
  } catch (error) {
    throw new Error(`delete resource error: ${error}`);
  }
};
