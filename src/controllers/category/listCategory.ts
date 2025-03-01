import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import {  listCategory, updateCategory } from "../../services/categoryService";

const router = Router();

export default router.get("/", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    let response = await listCategory();
    return send(res, response);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});