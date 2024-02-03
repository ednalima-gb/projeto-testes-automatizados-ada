require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const UserService = require("../../src/services/user-service");

describe("Integration test between BD and Service", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL_EDNA);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  test("Create a new user", async () => {
    const userCreated = await UserService.createUser({
      name: "Edna Barboza de Lima",
      email: "edna@edna.com",
      password: "123456",
    });

    // const userCreated = await UserService.createUser({
    //     name: faker.name.fullName(),
    //     email: faker.internet.email(),
    //     password: faker.internet.password()
    // })

    expect(userCreated).toHaveProperty("id");
  });

  test("Check if user exits and password is valid", async () => {
    const userFindOne = await UserService.userExistsAndCheckPassword({
      email: "Kennedi_Corkery53@gmail.com",
      password: "sfSRti2YFUkNCpQ",
    });
    expect(userFindOne).toBe(true);
  });

  test("Should not create a user with an existing email", async () => {
    const userData = {
      name: "Bruno Marques Gonçalves",
      email: "bruno@marques.com",
      password: "123456"
    };
    await UserService.createUser(userData);
    let error;
    try {
      await UserService.createUser(userData);
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
  });

  test("Should throw an error if the password is incorrect", async () => {
    const userData = {
      name: "Bruno Marques Gonçalves",
      email: "bruno@marques.com",
      password: "password"
    };
    const { id } = await UserService.createUser(userData);
    let error;

    try {
      await UserService.userExistsAndCheckPassword({
        email: userData.email,
        password: "wrongPassword"
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.status).toBe(400);
  });
});
