import express from "express";
import router from "./routes.js";

const makeApp = (database) => {
  if (database) {
    database();
  }
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/", router);

  return app;
};

export default makeApp;
