import axios from "axios";

export const CreateOrderApi = async (order, token) => {
  try {
    // Step 1: Create the order
    const createOrderResponse = await axios.post(
      "http://127.0.0.1:3000/api/v1/user/create_order",
      {}, // This can be adjusted if you need any order data
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (createOrderResponse.status === 201) {
      const orderId = createOrderResponse.data.data.id; // Accessing the order ID from response

      // Step 2: Loop over the order items and create them
      for (let i = 0; i < order.length; i++) {
        const orderItemResponse = await axios.post(
          `http://127.0.0.1:3000/api/v1/user/create_order_item/${orderId}`,
          {
            order_item: {
              food_id: order[i].id,
              quantity: order[i].quantity,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        if (orderItemResponse.status !== 201) {
          throw new Error("Failed to create order item");
        }
      }

      return { success: true, orderId };
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message: error.response?.data || "Order creation failed",
    };
  }
};
