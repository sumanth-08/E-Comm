import { STATE } from "../config/constants";
import initOrdersItemModel from "../models/ordersItemModel";
import initOrdersMasterModel from "../models/ordersMasterModel";
import initProductModel from "../models/productModel";

export const placeOrder = async (total_amt: number, payment_type: number, userId: string) => {
  try {
    const ordersModel = await initOrdersMasterModel();

    const data = await ordersModel.create({
      total_amt,
      payment_type,
      userId,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to place the orders");
  }
};

export const placeOrderItem = async (cart_amt: number, productId: string, orderId: string) => {
  try {
    const orderItemModel = await initOrdersItemModel();

    const data = await orderItemModel.create({
      cart_amt,
      productId,
      orderId,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to place the orders item");
  }
};

export const ordersHistory = async (userId: string) => {
  try {
    const orderMaster = await initOrdersMasterModel();
    const orderItem = await initOrdersItemModel();
    const productModel = await initProductModel();

    const data = await orderMaster.findAll({
      include: {
        model: orderItem,
        as: "orderItemInfo",
        required: false,
        attributes: ["order_item_id", "cart_amt", "productId", "orderId"],
        include: {
          model: productModel,
          as: "productInfo",
          attributes: ["product_id", "name", "description", "imageUrl"],
        },
      },
      where: { is_active: STATE.ACTIVE, userId: userId },
      attributes: ["order_id", "total_amt", "payment_type", "createdAt"],
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to order history");
  }
};
