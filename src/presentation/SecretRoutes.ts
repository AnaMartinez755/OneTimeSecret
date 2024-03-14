import express from "express";
import { SecretController } from "./SecretController";
const app = express();

app.use(express.json());

const secretController = new SecretController();

app.post("/api/secrets", secretController.createSecret.bind(secretController));
app.get(
  "/api/secret/:secretKey",
  secretController.getSecret.bind(secretController)
);

export default app;
