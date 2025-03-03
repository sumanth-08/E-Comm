import initAccountModel from "../models/accountModel";

export const signUp = async (email: string, password: string) => {
  try {
    const accountModel = await initAccountModel();

    let data = await accountModel?.create({ email, password });
    return data;
  } catch (err) {
    // console.log(err);
    throw new Error("failed to signup");
  }
};
