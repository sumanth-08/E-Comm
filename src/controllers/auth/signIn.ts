import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { signIn } from "../../services/authService";
import { validationResult } from "express-validator";
import { validateUserData } from "../../middlewares/validate";
const router = Router();

export default router.post("/", validateUserData, async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    const response = await signIn(email, password, res);

    return send(res, response);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
