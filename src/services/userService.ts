import initAccountModel from "../models/accountModel";

export const findUserByEmail = async (email: string) => {
  const accountModel = await initAccountModel();

  let userData = await accountModel?.findOne({
    where: {
      email: email,
    },
  });

  return userData;
};
