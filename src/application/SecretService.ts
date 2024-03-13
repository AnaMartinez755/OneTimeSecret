import { Secret } from "../domain/model/SecretModel";
import { SecretRepository } from "../domain/repository/SecretRepository.interface";

export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}

  async createSecret(message: string): Promise<number> {
    const secret = new Secret(message);
    const key = await this.secretRepository.storeSecret(secret);
    return key;
  }

  async getSecret(key: string): Promise<Secret | undefined> {
    const secret = await this.secretRepository.retrieveSecret(key);
    return secret;
  }
}
