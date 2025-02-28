import express from "express";
import signUp from "./src/controllers/auth/signUp";
import signIn from "./src/controllers/auth/signIn";

const routes = (app: express.Application) => {
  app.use(express.json());
  app.use("/api/auth/signup", signUp);
  app.use("/api/auth/signin", signIn);
};

export default routes;
