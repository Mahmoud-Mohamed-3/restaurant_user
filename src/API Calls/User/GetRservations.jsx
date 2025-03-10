import axios from "axios";

export const GetReservationsApi = async (jwt) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/user/reservations",
      {
        headers: {
          Authorization: `${jwt}`,
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user reservations:", error);
    return null;
  }
};
