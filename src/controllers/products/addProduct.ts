import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { addProduct } from "../../services/productService";
import { validateProductInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";

const router = Router();

export default router.post("/", authenticate, isAdminAccess, validateProductInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, price, stock, categoryId }: { name: string; description: string; price: number; stock: number; categoryId: string } = req.body;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    let response = await addProduct(name, description, price, stock, categoryId);
    return send(res, response);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
