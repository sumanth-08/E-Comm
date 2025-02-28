import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";

const router = Router();

export default router.post("/", authenticate, isAdminAccess, async (req: Request, res: Response): Promise<any> => {
  try {
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
