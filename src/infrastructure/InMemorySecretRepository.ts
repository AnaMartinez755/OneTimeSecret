import { SecretRepository } from "../domain/repository/SecretRepository.interface";
import { Secret } from "../domain/model/SecretModel";
import * as crypto from "crypto";
import * as data from "../../config.json";
const secrets_map: { [key: string]: string } = {};

export class InMemorySecretRepository implements SecretRepository {
  async storeSecret(secret: Secret): Promise<number> {
    const bytes = crypto.randomBytes(data.secretSize);
    const secretKey: number = parseInt(bytes.toString("hex"), data.secretSize);
    secrets_map[secretKey] = JSON.stringify(secret);
    return secretKey;
  }

  async retrieveSecret(key: string): Promise<Secret | undefined> {
    const secretData = secrets_map[key];
    if (!secretData) return undefined;
    return JSON.parse(secretData) as Secret;
  }
}
