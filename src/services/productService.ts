import { STATE } from "../config/constants";
import { RESPONSE } from "../config/response";
import initCategoryModel from "../models/categoryModel";
import initProductModel from "../models/productModel";
import { setResponseMsg } from "../utils/responseUtil";
import { categoryFindById } from "./categoryService";

export const addProduct = async (name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string) => {
  try {
    const productModel = await initProductModel();

    const isCatExist = await categoryFindById(categoryId);
    // console.log(isCatExist);
    if (!isCatExist) {
      return setResponseMsg(RESPONSE.NOT_FOUND, "Category");
    }

    await productModel.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to add product");
  }
};

export const listProduct = async () => {
  try {
    const productModel = await initProductModel();
    const categoryModel = await initCategoryModel();

    let data = await productModel.findAll({
      include: [
        {
          model: categoryModel,
          as: "categoryInfo",
          attributes: ["category_id", "name", "description"],
        },
      ],
      where: { is_active: STATE.ACTIVE },
      attributes: ["product_id", "name", "description", "price", "stock", "imageUrl"],
    });

    return setResponseMsg(RESPONSE.SUCCESS, "", data);
  } catch (err) {
    throw new Error("Failed to list product");
  }
};

export const updateProduct = async (id: string, name: string, description: string, price: number, stock: number, categoryId: string) => {
  try {
    const productModel = await initProductModel();

    const isCatExist = await categoryFindById(categoryId);
    if (!isCatExist) {
      return setResponseMsg(RESPONSE.NOT_FOUND, "Category");
    }

    await productModel.update(
      {
        name,
        description,
        price,
        stock,
        categoryId,
      },
      {
        where: {
          product_id: id,
        },
      }
    );

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const productModel = await initProductModel();

    await productModel.update(
      {
        is_active: STATE.INACTIVE,
      },
      {
        where: {
          product_id: id,
        },
      }
    );

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to delete product");
  }
};
