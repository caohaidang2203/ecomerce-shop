import axios from "axios";
import { server } from "../../server";

// get all shops --- admin
export const getAllShops = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopsRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-shops`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllShopsSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopFailed",
      //   payload: error.response.data.message,
    });
  }
};
