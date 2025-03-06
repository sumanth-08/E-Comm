import initAccountModel from "../models/accountModel";

export const findUserByEmail = async (email: string) => {
  const accountModel = await initAccountModel();

  const userData = await accountModel?.findOne({
    where: {
      email: email,
    },
  });

  return userData;
};
