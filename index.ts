import express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import crypto from "crypto";
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Store in memory
let secrets: { [key: string]: string } = {};

function generateSecretKey(): number {
  const bytes = crypto.randomBytes(4);
  const randomNumber = parseInt(bytes.toString("hex"), 16);
  return randomNumber;
}

app.post("/api/secrets", (req: Request, res: Response) => {
  const { message }: { message: string } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message is necesary" });
  }
  const secretKey: number = generateSecretKey();
  secrets[secretKey] = message;
  res.status(201).json({ secretKey });
});

app.get("/api/secret/:secretKey", (req: Request, res: Response) => {
  const { secretKey } = req.params as { secretKey: string };
  const secretMessage: string | undefined = secrets[secretKey];
  if (!secretMessage) {
    return res.sendStatus(404);
  }
  // Delete the second time
  delete secrets[secretKey];
  res.json({ secretMessage });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
