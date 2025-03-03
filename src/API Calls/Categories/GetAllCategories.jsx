import axios from "axios";

export const GetAllCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/v1/categories");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return null;
  }
};
