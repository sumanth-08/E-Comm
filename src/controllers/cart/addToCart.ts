import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { addToCart, cartItemExist } from "../../services/cartService";
import { getProductData } from "../../services/productService";
import { validateCartInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";
const router = Router();

export default router.post("/", authenticate, validateCartInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { quantity, productId }: { quantity: number; productId: string } = req.body;
    const userId = (req as any).user?.userid;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    let productData = await getProductData(productId);
    if (!productData) {
      return send(res, setResponseMsg(RESPONSE.NOT_FOUND, "Product"));
    }
    const { price }: any = productData;

    let isItemAlreadyExist = await cartItemExist(productId, userId);
    if (isItemAlreadyExist) {
      return send(res, setResponseMsg(RESPONSE.ALREADY_EXIST, "Product in cart"));
    }

    await addToCart(quantity, price, productId, userId);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN);
  }
});
