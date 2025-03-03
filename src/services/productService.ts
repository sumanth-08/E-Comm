import { Op } from "sequelize";
import { STATE } from "../config/constants";
import initCategoryModel from "../models/categoryModel";
import initProductModel from "../models/productModel";

export const addProduct = async (name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string) => {
  try {
    const productModel = await initProductModel();

    let data = await productModel.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    return data;
  } catch (err) {
    throw new Error("Failed to add product");
  }
};

export const listProduct = async (page: number, limit: number, price_range: {}, search?: string, category?: any) => {
  try {
    const productModel = await initProductModel();
    const categoryModel = await initCategoryModel();

    let query: any = {};
    query.is_active = STATE.ACTIVE;

    // console.log(price_range);
    // price range filter
    if (price_range) query.price = { [Op.or]: price_range };

    // serch by product name
    if (search) query.name = { [Op.iLike]: "%" + search + "%" };

    // category filter
    // console.log("x",category);
    if (category) query.categoryId = category.category_id;

    let data = await productModel.findAll({
      include: [
        {
          model: categoryModel,
          as: "categoryInfo",
          attributes: ["category_id", "name", "description"],
        },
      ],
      where: query,
      attributes: ["product_id", "name", "description", "price", "stock", "imageUrl"],
      offset: (page - 1) * limit,
      limit: limit,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to list product");
  }
};

export const updateProduct = async (id: string, name: string, description: string, price: number, stock: number, categoryId: string) => {
  try {
    const productModel = await initProductModel();

    let data = await productModel.update(
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

    return data;
  } catch (err) {
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const productModel = await initProductModel();

    let data = await productModel.update(
      {
        is_active: STATE.INACTIVE,
      },
      {
        where: {
          product_id: id,
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error("Failed to delete product");
  }
};

export const getProductData = async (id: string) => {
  try {
    const productModel = await initProductModel();

    let data = await productModel.findOne({
      where: {
        product_id: id,
      },
    });

    return data;
  } catch (err) {
    throw new Error("Failed to delete product");
  }
};
