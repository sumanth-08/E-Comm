import { RESPONSE } from "../config/response";
import initAccountModel from "../models/accountModel";
import { hashPassword } from "../utils/passwordUtil";
import { setResponseMsg } from "../utils/responseUtil";
import { findUserByEmail } from "./userService";

export const signUp = async (email: string, password: string) => {
  const accountModel = await initAccountModel();

  const isUser = await findUserByEmail(email);

  if (isUser) {
    return setResponseMsg(RESPONSE.ALREADY_EXIST, "User");
  }

  const encryptedPass = await hashPassword(password);

  await accountModel?.create({ email, password: encryptedPass });
  return setResponseMsg(RESPONSE.SUCCESS);
};
