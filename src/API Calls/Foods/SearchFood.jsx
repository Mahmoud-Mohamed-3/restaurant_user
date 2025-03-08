import axios from "axios";

export const SearchFoodApi = async (query) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/food/search/${query}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
