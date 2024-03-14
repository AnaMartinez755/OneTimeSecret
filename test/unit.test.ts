const crypto = require("crypto");
import { InMemorySecretRepository } from "../src/infrastructure/InMemorySecretRepository";
jest.mock("crypto");

describe("generateSecretKey", () => {
  let mockRandomBytes;
  const inMemorySecretRepository = new InMemorySecretRepository();
  beforeEach(() => {
    mockRandomBytes = jest.fn();
    crypto.randomBytes.mockReturnValue(mockRandomBytes);
  });

  it("should generate a secret key of the specified size", async () => {
    const secretSize = 32;
    const mockBytes = Buffer.alloc(secretSize);
    mockRandomBytes.mockReturnValueOnce(mockBytes);

    const secretKey = await inMemorySecretRepository.generateSecretKey(
      secretSize
    );

    // Assertions
    expect(crypto.randomBytes).toHaveBeenCalledTimes(1);
    expect(crypto.randomBytes).toHaveBeenCalledWith(secretSize);
    expect(secretKey).toBeGreaterThanOrEqual(0);
    expect(secretKey).toBeLessThan(Math.pow(16, secretSize));
  });
});
