import axios from "axios";

export const GetCategoryDetailsApi = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/category_food/${id}`,
    );
    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch category details");
    return null;
  }
};
