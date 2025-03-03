import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { deleteProduct } from "../../services/productService";

const router = Router();

export default router.delete("/:id", authenticate, isAdminAccess, async (req: Request, res: Response): Promise<any> => {
  try {
    const product_id = req.params.id;

    await deleteProduct(product_id);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
