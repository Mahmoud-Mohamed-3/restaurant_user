import axios from "axios";

export const GetTablesApi = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/show_tables",
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch tables");
    }
  } catch (error) {
    console.error("Error fetching tables:", error);
    return null;
  }
};
