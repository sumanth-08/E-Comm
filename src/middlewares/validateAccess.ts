import { Request, Response } from "express";
import { RESPONSE } from "../config/response";
import { send } from "../utils/responseUtil";
import { ACCOUNTS } from "../config/constants";

interface authRequest extends Request {
  user?: { role: number };
}

export const isAdminAccess = (req: authRequest, res: Response, next: Function): void => {
  if (!req.user) {
    send(res, RESPONSE.ACCESS_DENIED);
    return;
  }
  if (req.user.role !== ACCOUNTS.ADMIN) {
    send(res, RESPONSE.FORBIDDEN);
    return;
  }
  next();
};
