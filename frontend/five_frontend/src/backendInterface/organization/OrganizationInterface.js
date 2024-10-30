import { doPostRequest } from "../BackendInterface";

export const registerOrganization = async (organization) => {
  try {
    return await doPostRequest("/organizations/register", organization);
  } catch (e) {
    console.error("Registration failed: " + e);
  }
};

export const loginOrganization = async (organization) => {
  try {
    return await doPostRequest("/organizations/login", organization);
  } catch (e) {
    console.error("Registration failed: " + e);
  }
};
