import jwt from "jsonwebtoken";

export const jwtTokenCreation = async (id: string, role: number, email: string) => {
  return jwt.sign(
    {
      userid: id,
      role: role,
      email: email,
    },
    process.env.JWT_SECRET as string
  );
};
