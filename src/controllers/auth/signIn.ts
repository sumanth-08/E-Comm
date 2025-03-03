import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { validationResult } from "express-validator";
import { validateUserData } from "../../middlewares/validate";
import { findUserByEmail } from "../../services/userService";
import { comparePass } from "../../utils/passwordUtil";
import { jwtTokenCreation } from "../../utils/jwtToken";
const router = Router();

export default router.post("/", validateUserData, async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    const isUser: any = await findUserByEmail(email);

    if (isUser && (await comparePass(password, isUser.password))) {
      const token = await jwtTokenCreation(isUser.account_id, isUser.role, isUser.email);

      res.cookie("accessToken", token, {
        httpOnly: true,
      });

      return send(res, setResponseMsg(RESPONSE.SUCCESS));
    } else {
      return send(res, setResponseMsg(RESPONSE.NOT_FOUND, "User"));
    }
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
