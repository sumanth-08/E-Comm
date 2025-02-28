import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePass = async (password: string, oldPassword: string) => {
  return await bcrypt.compare(password, oldPassword);
};
