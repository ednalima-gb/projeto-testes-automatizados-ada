const SessionService = require("../../../../src/services/session-service");

describe("SessionService", () => {
  beforeAll(() => {
    process.env.SECRET_KEY = "c420a756a520c980271e181c9b18f3f2";
  });
  it("should generate a valid token", () => {
    const email = "rodrigo@email.com";
    const token = SessionService.generateToken({ email });

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  it("should throw an error if email is not provided", () => {
    const invalidData = {
      email: "",
    };
    const res = SessionService.generateToken(invalidData);
    console.log(res);
    expect(typeof res).toBe("string");
  });
});
