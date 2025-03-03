import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { removeFromCart } from "../../services/cartService";
const router = Router();

export default router.delete("/:id", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    await removeFromCart(id);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
