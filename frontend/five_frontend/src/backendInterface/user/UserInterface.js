import { doPostRequest } from "../BackendInterface";

export const registerUser = async (user) => {
  try {
    return await doPostRequest("/users/register", user);
  } catch (e) {
    console.error("Registration failed: " + e);
  }
};

export const loginUser = async (user) => {
  try {
    return await doPostRequest("/users/login", user);
  } catch (e) {
    console.error("Registration failed: " + e);
  }
};


