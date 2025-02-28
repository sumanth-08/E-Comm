import { Request, Response, Router } from "express";
import initAccountModel from "../../models/accountModel";
import { signUp } from "../../services/authService";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { validateUserData } from "../../middlewares/validate";
import { validationResult } from "express-validator";

const router: Router = Router();

export default router.post("/", validateUserData, async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const inputError = validationResult(req);
    // console.log(inputError.errors);

    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    let response = await signUp(email, password);

    return send(res, response);
  } catch (err) {
    // console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
