import axios from "axios";

export const GetUserOrdersApi = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/user/your_orders",
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return response.message;
    }
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
  }
};
