import { Request, Response } from "express";
import { RESPONSE } from "../config/response";
import { send } from "../utils/responseUtil";
import jwt from "jsonwebtoken";

interface authRequest extends Request {
  user?: any;
}

export const authenticate = (req: authRequest, res: Response, next: Function) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return send(res, RESPONSE.ACCESS_DENIED);
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode;
    return next();
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.INVALID_TOKEN);
  }
};
