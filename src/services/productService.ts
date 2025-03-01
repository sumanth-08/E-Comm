import { RESPONSE } from "../config/response";
import initProductModel from "../models/productModel";
import { setResponseMsg } from "../utils/responseUtil";
import { categoryFindById } from "./categoryService";

export const addProduct = async (name: string, description: string, price: number, stock: number, categoryId: string) => {
  try {
    const productModel = await initProductModel();

    const isCatExist = await categoryFindById(categoryId);
    // console.log(isCatExist);
    if (!isCatExist) {
        return setResponseMsg(RESPONSE.NOT_FOUND, "Category")
    }

    await productModel.create({
      name,
      description,
      price,
      stock,
      categoryId,
    });

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to add product");
  }
};
