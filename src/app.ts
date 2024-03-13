import express from "express";
import { SecretController } from "./presentation/SecretController";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const secretController = new SecretController();

app.post("/api/secrets", secretController.createSecret.bind(secretController));
app.get(
  "/api/secret/:secretKey",
  secretController.getSecret.bind(secretController)
);

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
