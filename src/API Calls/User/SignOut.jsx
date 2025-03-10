import axios from "axios";

export const Logout = async (jwt) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:3000/users/sign_out",
      {
        headers: {
          Authorization: jwt,
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};
