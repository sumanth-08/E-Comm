import initCartModel from "../models/cartModel";
import initProductModel from "../models/productModel";

export const addToCart = async (quantity: number, price: number, productId: string, userId: string) => {
  try {
    const cartModel = await initCartModel();

    const data = await cartModel.create({
      quantity,
      price,
      productId,
      userId,
    });

    return data;
  } catch (err) {
    throw new Error("Failed to add item to cart");
  }
};

export const cartItemExist = async (productId: string, userId: string) => {
  try {
    const cartModel = await initCartModel();

    const data = await cartModel.findOne({
      where: {
        productId,
        userId,
      },
    });

    return data;
  } catch (err) {
    throw new Error("Failed to check cart");
  }
};

export const listMyCartItem = async (userId: string) => {
  try {
    const cartModel = await initCartModel();
    const productModel = await initProductModel();

    const data = await cartModel.findAll({
      include: [
        {
          model: productModel,
          as: "productInfo",
          attributes: ["product_id", "name", "price", "stock", "imageUrl"],
        },
      ],
      where: {
        userId,
      },
      attributes: ["cart_id", "quantity", "price", "productId", "userId"],
    });

    return data;
  } catch (err) {
    throw new Error("Failed to list cart");
  }
};

export const removeFromCart = async (id: string) => {
  try {
    const cartModel = await initCartModel();

    const data = await cartModel.destroy({ where: { cart_id: id } });

    return data;
  } catch (err) {
    throw new Error("Failed to remove item from cart");
  }
};
