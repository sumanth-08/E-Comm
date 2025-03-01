import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { createCategory } from "../../services/categoryService";

const router = Router();

export default router.post("/", authenticate, isAdminAccess, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description }: { name: string; description: string } = req.body;

    let response = await createCategory(name, description);
    return send(res, response);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
