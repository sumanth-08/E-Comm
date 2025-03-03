import { STATE } from "../config/constants";
import initCategoryModel from "../models/categoryModel";

export const createCategory = async (name: string, description: string) => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.create({
      name,
      description,
    });

    return data;
  } catch (err) {
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (name: string, description: string, id: string) => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.update(
      {
        name,
        description,
      },
      {
        where: {
          category_id: id,
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error("Failed to create category");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.update(
      {
        is_active: STATE.INACTIVE,
      },
      {
        where: {
          category_id: id,
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error("Failed to create category");
  }
};

export const listCategory = async () => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.findAll({
      where: {
        is_active: STATE.ACTIVE,
      },
      attributes: ["category_id", "name", "description"],
      order: [["name", "ASC"]],
    });

    return data;
    // return data;
  } catch (err) {
    throw new Error("Failed to list category");
  }
};

export const categoryFindById = async (id: string) => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.findOne({
      where: {
        category_id: id,
      },
    });

    return data;
  } catch (err) {
    throw new Error("Failed to find by id category");
  }
};

export const categoryFindByName = async (name: string) => {
  try {
    const categoryModel = await initCategoryModel();

    let data = await categoryModel.findOne({
      where: {
        name: name,
      },
    });

    return data;
  } catch (err) {
    throw new Error("Failed to find by id category");
  }
};
