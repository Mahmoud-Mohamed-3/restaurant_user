import axios from "axios";

export const GetRecommendedFoodsApi = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/recommended_food",
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch recommended foods");
  }
};
