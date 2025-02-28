import axios from "axios";

export const Register = async (valuesObj) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/users",
      { user: valuesObj },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("API error:", error.response?.data);
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.status?.message || "An unexpected error occurred",
    };
  }
};
