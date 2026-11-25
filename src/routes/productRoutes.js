import { Router } from "express";

import ProductController from "../controllers/ProductController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", ProductController.GetAll);
router.post("/create", auth.authUser, ProductController.Create);
router.patch("/:id", auth.authUser, ProductController.Update);
router.delete("/:id", auth.authUser, ProductController.Delete);


export default router;
