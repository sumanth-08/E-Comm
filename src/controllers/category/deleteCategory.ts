import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { deleteCategory } from "../../services/categoryService";

const router = Router();

export default router.delete("/:id", authenticate, isAdminAccess, async (req: Request, res: Response): Promise<any> => {
  try {
    const cat_id = req.params.id;

    await deleteCategory(cat_id);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
