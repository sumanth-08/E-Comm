import { RESPONSE } from "../config/response";
import initAccountModel from "../models/accountModel";
import { setResponseMsg } from "../utils/responseUtil";

export const signUp = async (email: string, password: string) => {
  try {
    const accountModel = await initAccountModel();

    await accountModel?.create({ email, password });
    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    // console.log(err);
    throw new Error("failed to signup");
  }
};
