import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { placeOrder, placeOrderItem } from "../../services/ordersService";
import { listMyCartItem } from "../../services/cartService";
import { validateOrderInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";

const router = Router();

export default router.post("/", authenticate, validateOrderInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { payment_type }: { payment_type: number } = req.body;
    const userId = (req as any).user?.userid;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    let cartData: any = await listMyCartItem(userId);
    // console.log(cartData);

    if (!cartData.length) {
        return send(res, setResponseMsg(RESPONSE.NOT_FOUND, "Cart"))
    }

    let cartAmt = cartData.map((itm: any) => itm.price * itm.quantity);
    // console.log(cartAmt);
    let totalPayAmt = cartAmt.reduce((prev: number, cur: number) => prev + cur);
    // console.log(totalPayAmt);

    let orderData: any = await placeOrder(totalPayAmt, payment_type, userId);
    // console.log(orderData.order_id);

    for (let i = 0; i < cartData.length; i++) {
      await placeOrderItem(cartData[i].price, cartData[i].productId, orderData.order_id);
    }

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
