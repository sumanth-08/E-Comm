import { Request, Response, Router } from "express";
import { send } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { ordersHistory } from "../../services/ordersService";
import { PAYMENT_TYPE } from "../../config/constants";
import moment from "moment";

const router = Router();

export default router.get("/", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user?.userid;

    let data = await ordersHistory(userId);

    data = data.map((item: any) => {
      return {
        ...item.toJSON(),
        payment_type: item.payment_type === PAYMENT_TYPE.ONLINE ? "online" : "COD",
        order_date: moment(item.createdAt).format("ll")
      };
    });

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
