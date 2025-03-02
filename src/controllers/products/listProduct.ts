import { Request, Response, Router } from "express";
import { send, setResponseMsg } from "../../utils/responseUtil";
import { RESPONSE } from "../../config/response";
import { authenticate } from "../../middlewares/authenticate";
import { listProduct } from "../../services/productService";
import { Op } from "sequelize";
import { categoryFindByName } from "../../services/categoryService";
const router = Router();

export default router.get("/", authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    // paginaation
    let page: number = Number(req.query.page) || 1;
    let limit: number = Number(req.query.limit) || 10;

    let price_range = req.query.price_range;
    let search: any = req.query.search;
    let category: any = req.query.category;

    // price ranbge filter
    let splitedRange: { min: number; max: number }[] = [];
    if (price_range) {
      if (!Array.isArray(price_range)) {
        price_range = [price_range];
      }
      splitedRange = price_range.map((range: any) => {
        const [min, max] = range.split("-").map(Number);
        return { min, max };
      });
    }

    let priceCondition = {};
    if (splitedRange.length) {
      priceCondition = splitedRange.map((range: any) => ({
        [Op.between]: [range.min, range.max],
      }));
    }

    // filter by category
    let catObj;
    if (category) {
      catObj = await categoryFindByName(category);
      // console.log("c", catObj);
    } 

    let response = await listProduct(page, limit, priceCondition, search, catObj);
    return send(res, response);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN);
  }
});
