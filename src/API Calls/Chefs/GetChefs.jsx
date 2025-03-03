import axios from "axios";

export const GetChefsApi = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/v1/chefs");
    if (response) {
      return response.data;
    } else {
      console.error("Failed to fetch chefs");
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch chefs", error);
    return null;
  }
};
