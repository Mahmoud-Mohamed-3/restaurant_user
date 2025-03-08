import axios from "axios";

export const BookTableApi = async (id, reservation, token) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/user/book_table/${id}`,
      { reservation },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return { status: response.status, data: response.data.data };
  } catch (error) {
    console.error("Error booking table:", error);
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Table booking failed",
    };
  }
};
