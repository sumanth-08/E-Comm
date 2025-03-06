import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { listCategory } from "../../services/categoryService";

const router = Router();

export default router.get("/", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await listCategory();
    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
