import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { updateCategory } from "../../services/categoryService";
import { validateCategoryInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";

const router = Router();

export default router.put("/:id", authenticate, isAdminAccess, validateCategoryInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description }: { name: string; description: string } = req.body;
    const cat_id = req.params.id;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    await updateCategory(name, description, cat_id);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
