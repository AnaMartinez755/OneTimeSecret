import * as express from "express";
import { SecretService } from "../application/SecretService.js";
import { InMemorySecretRepository } from "../infrastructure/InMemorySecretRepository.js";

export class SecretController {
  constructor(
    //injection
    private readonly secretService: SecretService = new SecretService(
      new InMemorySecretRepository()
    )
  ) {}

  async createSecret(req: express.Request, res: express.Response) {
    const { message } = req.body;
    try {
      const key = await this.secretService.createSecret(message);
      res.status(201).json({ secretKey: key });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getSecret(req: express.Request, res: express.Response) {
    const { secretKey } = req.params;
    try {
      const secret = await this.secretService.getSecret(secretKey);
      if (!secret) return res.sendStatus(404);
      res.status(200).json({ secretMessage: secret.message });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
