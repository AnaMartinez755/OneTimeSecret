import { Secret } from "../model/SecretModel";
export interface SecretRepository {
  storeSecret(secret: Secret): Promise<number>;
  retrieveSecret(key: string): Promise<Secret | undefined>;
}
