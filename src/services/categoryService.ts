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
