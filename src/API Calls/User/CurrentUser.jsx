import axios from "axios";

export const GetCurrentUser = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/user/current_user",
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch current user details");
  }
};
