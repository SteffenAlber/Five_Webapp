import axios from "axios";

const serverUrl = "http://localhost:5000";

export const doPostRequest = async (endpointPath, requestBody) => {
  return await axios.post(serverUrl + endpointPath, requestBody);
};

export const doGetRequest = async (endpointPath) => {
  return await axios.get(serverUrl + endpointPath);
};

export const doPutRequest = async (endpointPath, requestBody) => {
  return await axios.put(serverUrl + endpointPath, requestBody);
};

export const doDeleteRequest = async (endpointPath, requestBody) => {
  return await axios.delete(serverUrl + endpointPath, requestBody);
};

// import axios from "axios";

// const serverUrl = "http://localhost:5000"; // Ensure this is correct

// export const doPostRequest = async (endpointPath, requestBody) => {
//   try {
//     const response = await axios.post(`${serverUrl}${endpointPath}`, requestBody);
//     return response.data;
//   } catch (error) {
//     // Handle error appropriately
//     throw error.response?.data || error;
//   }
// };

// export const doGetRequest = async (endpointPath) => {
//   try {
//     const response = await axios.get(`${serverUrl}${endpointPath}`);
//     return response.data;
//   } catch (error) {
//     // Handle error appropriately
//     throw error.response?.data || error;
//   }
// };

// export const doPutRequest = async (endpointPath, requestBody) => {
//   try {
//     const response = await axios.put(`${serverUrl}${endpointPath}`, requestBody);
//     return response.data;
//   } catch (error) {
//     // Handle error appropriately
//     throw error.response?.data || error;
//   }
// };

// export const doDeleteRequest = async (endpointPath) => { // DELETE typically doesn't have a body
//   try {
//     const response = await axios.delete(`${serverUrl}${endpointPath}`);
//     return response.data;
//   } catch (error) {
//     // Handle error appropriately
//     throw error.response?.data || error;
//   }
// };
