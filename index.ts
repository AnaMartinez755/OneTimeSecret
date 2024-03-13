import express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import data from "./config.json";
import crypto from "crypto";
const app = express();

app.use(bodyParser.json());

// Store in memory
const secrets_map: { [key: string]: string } = {};
function aleatoryValue(): number {
  let randomNumber: number = 0;
  const bytes = crypto.randomBytes(data.secretSize);
  randomNumber = parseInt(bytes.toString("hex"), data.secretSize);
  return randomNumber;
}

app.post("/api/secrets", (req: Request, res: Response) => {
  const { message }: { message: string } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message not send" });
  }
  const secretKey: number = aleatoryValue();
  secrets_map[secretKey] = message;
  res.status(201).json({ secretKey }); // in create --> created succesfull
});

app.get("/api/secret/:secretKey", (req: Request, res: Response) => {
  const { secretKey } = req.params as { secretKey: string };
  const secretMessage: string | undefined = secrets_map[secretKey];
  if (!secretMessage) {
    return res.sendStatus(404);
  }
  // Delete the second time
  delete secrets_map[secretKey];
  res.status(200).json({ secretMessage });
});

app.listen(data.portNumber, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
