import axios from "axios";

export const EditProfileApi = async (token, user) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:3000/users",
      { user },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};
