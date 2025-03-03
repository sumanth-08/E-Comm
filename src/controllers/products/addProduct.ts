import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { isAdminAccess } from "../../middlewares/validateAccess";
import { addProduct } from "../../services/productService";
import { validateProductInput } from "../../middlewares/validate";
import { validationResult } from "express-validator";
import { uploads } from "../../middlewares/uploads";
const upload = uploads().single("image");
import fs from "fs";
import { cloudinaryUploader } from "../../utils/cloudinaryUploader";
import { categoryFindById } from "../../services/categoryService";

const router = Router();

export default router.post("/", authenticate, isAdminAccess, upload, validateProductInput, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, price, stock, categoryId }: { name: string; description: string; price: number; stock: number; categoryId: string } = req.body;

    const inputError = validationResult(req);
    if (!inputError.isEmpty()) {
      return send(res, setResponseMsg(RESPONSE.VALIDATOR, inputError.array()[0].msg));
    }

    const isCatExist = await categoryFindById(categoryId);
    // console.log(isCatExist);
    if (!isCatExist) {
      return send(res, setResponseMsg(RESPONSE.NOT_FOUND, "Category"));
    }

    // console.log(req.file);

    let fileData: any = {};
    if (req.file) {
      fileData = await cloudinaryUploader(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    // console.log(fileData);
    const imageUrl = fileData?.secure_url || null;

    await addProduct(name, description, price, stock, categoryId, imageUrl);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
