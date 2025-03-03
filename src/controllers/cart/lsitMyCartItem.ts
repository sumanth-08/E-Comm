import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { listMyCartItem } from "../../services/cartService";
const router = Router();

export default router.get("/", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user?.userid;

    let data = await listMyCartItem(userId);
    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
