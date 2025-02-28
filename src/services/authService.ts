import { Response } from "express";
import { RESPONSE } from "../config/response";
import initAccountModel from "../models/accountModel";
import { jwtTokenCreation } from "../utils/jwtToken";
import { comparePass, hashPassword } from "../utils/passwordUtil";
import { setResponseMsg } from "../utils/responseUtil";
import { findUserByEmail } from "./userService";

export const signUp = async (email: string, password: string) => {
  try {
    const accountModel = await initAccountModel();

    const isUser = await findUserByEmail(email);

    if (isUser) {
      return setResponseMsg(RESPONSE.ALREADY_EXIST, "User");
    }

    const encryptedPass = await hashPassword(password);

    await accountModel?.create({ email, password: encryptedPass });
    return setResponseMsg(RESPONSE.SUCCESS);
  } catch (err) {
    // console.log(err);
    throw new Error("something went wrong");
  }
};

export const signIn = async (email: string, password: string, res: Response) => {
  try {
    const isUser: any = await findUserByEmail(email);

    if (isUser && (await comparePass(password, isUser.password))) {
      const token = await jwtTokenCreation(isUser.account_id, isUser.role, isUser.email);

      res.cookie("accessToken", token, {
        httpOnly: true,
      });

      return setResponseMsg(RESPONSE.SUCCESS);
    } else {
      return setResponseMsg(RESPONSE.NOT_FOUND, "User");
    }
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong");
  }
};
