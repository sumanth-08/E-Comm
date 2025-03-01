import { STATE } from "../config/constants";
import { RESPONSE } from "../config/response";
import initCategoryModel from "../models/categoryModel";
import { setResponseMsg } from "../utils/responseUtil";

export const createCategory = async (name: string, description: string) => {
  try {
    const categoryModel = await initCategoryModel();

    await categoryModel.create({
      name,
      description,
    });

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (name: string, description: string, id: string) => {
  try {
    const categoryModel = await initCategoryModel();

    await categoryModel.update(
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

    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    throw new Error("Failed to create category");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const categoryModel = await initCategoryModel();

    await categoryModel.update(
      {
        is_active: STATE.INACTIVE,
      },
      {
        where: {
          category_id: id,
        },
      }
    );

    return setResponseMsg(RESPONSE.SUCCESS);
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
      order: [["name", "ASC"]]
    });

    return setResponseMsg(RESPONSE.SUCCESS, "", { data });
    // return data;
  } catch (err) {
    throw new Error("Failed to create category");
  }
};
