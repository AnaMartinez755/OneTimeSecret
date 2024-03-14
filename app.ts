import * as express from "express";
import { SecretController } from "./src/presentation/SecretController";
import * as data from "./config.json";
const app = express();

app.use(express.json());

const secretController = new SecretController();

app.post("/api/secrets", secretController.createSecret.bind(secretController));
app.get(
  "/api/secret/:secretKey",
  secretController.getSecret.bind(secretController)
);

app.listen(data.portNumber, () => {
  console.log(`Listening http://localhost:${data.portNumber}`);
});

export default app;
