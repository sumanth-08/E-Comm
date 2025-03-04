import express from "express";
import signUp from "./src/controllers/auth/signUp";
import signIn from "./src/controllers/auth/signIn";
import createCategory from "./src/controllers/category/createCategory";
import updateCategory from "./src/controllers/category/updateCategory";
import deleteCategory from "./src/controllers/category/deleteCategory";
import listCategory from "./src/controllers/category/listCategory";
import addProduct from "./src/controllers/products/addProduct";
import listProduct from "./src/controllers/products/listProduct";
import updateProduct from "./src/controllers/products/updateProduct";
import deleteProduct from "./src/controllers/products/deleteProduct";
import addToCart from "./src/controllers/cart/addToCart";
import lsitMyCartItem from "./src/controllers/cart/lsitMyCartItem";
import removeItemCart from "./src/controllers/cart/removeItemCart";
import placeOrder from "./src/controllers/orders/placeOrder";
import orderHistory from "./src/controllers/orders/orderHistory";

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
  app.use("/api/product/list", listProduct);
  app.use("/api/product/update", updateProduct);
  app.use("/api/product/delete", deleteProduct);

  // cart
  app.use("/api/cart/add", addToCart);
  app.use("/api/cart/list", lsitMyCartItem);
  app.use("/api/cart/remove", removeItemCart);

  // orders
  app.use("/api/orders/place", placeOrder);
  app.use("/api/orders/history", orderHistory);
};

export default routes;
