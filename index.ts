import express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import crypto from "crypto";
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Store in memory
let secrets_map: { [key: string]: string } = {};
function aleatoryValue(): number {
  let randomNumber: number = 0;
  const bytes = crypto.randomBytes(32);
  randomNumber = parseInt(bytes.toString("hex"), 32);
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

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
