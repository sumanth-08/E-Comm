import express from "express";
import signUp from "./src/controllers/auth/signUp";
import signIn from "./src/controllers/auth/signIn";
import createCategory from "./src/controllers/category/createCategory";
import updateCategory from "./src/controllers/category/updateCategory";
import deleteCategory from "./src/controllers/category/deleteCategory";
import listCategory from "./src/controllers/category/listCategory";
import addProduct from "./src/controllers/products/addProduct";

const routes = (app: express.Application) => {
  app.use(express.json());
  // auth
  app.use("/api/auth/signup", signUp);
  app.use("/api/auth/signin", signIn);

  // category
  app.use("/api/category/add", createCategory);
  app.use("/api/category/update", updateCategory);
  app.use("/api/category/delete", deleteCategory);
  app.use("/api/category/list", listCategory);

  // products
  app.use("/api/product/add", addProduct);
};

export default routes;
