import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { createCategory } from "../../services/categoryService";
import { validateCategoryInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";

const router = Router();

export default router.post("/", authenticate, isAdminAccess, validateCategoryInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description }: { name: string; description: string } = req.body;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    await createCategory(name, description);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
