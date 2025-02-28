import express from "express";
import signUp from "./src/controllers/auth/signUp";

const routes = (app: express.Application) => {
  app.use(express.json());
  app.use("/api/auth/signup", signUp);
};

export default routes;
