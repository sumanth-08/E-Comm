import express from "express";
import signUp from "./src/controllers/auth/signUp";
import signIn from "./src/controllers/auth/signIn";
import createCategory from "./src/controllers/category/createCategory";

const routes = (app: express.Application) => {
  app.use(express.json());
  // auth
  app.use("/api/auth/signup", signUp);
  app.use("/api/auth/signin", signIn);
  
  // category
  app.use("/api/category/add", createCategory);
};

export default routes;
