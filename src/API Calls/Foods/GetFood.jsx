import axios from "axios";

export const GetFoodApi = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/show_food/${id}`,
    );
    if (response) {
      return [response.data.data];
    } else return null;
  } catch (error) {
    return ["error"];
  }
};
