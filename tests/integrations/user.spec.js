require('dotenv').config();
const mongoose = require('mongoose');
const {faker} = require('@faker-js/faker');

const UserService = require('../../src/services/user-service')

describe('Integration test between BD and Service', () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.MONGO_DB_URL)
    })

    afterAll(async() => {
        await mongoose.connection.close()
    })
    test('Create a new user', async() => {
        const userCreated = await UserService.createUser({
            name: 'Edna Barboza de Lima',
            email: 'edna@edna.com',
            password: '123456'
        })

        // const userCreated = await UserService.createUser({
        //     name: faker.name.fullName(),
        //     email: faker.internet.email(),
        //     password: faker.internet.password()
        // })

        expect(userCreated).toHaveProperty('id')
    })

    test('Check if user exits and password is valid', async() => {
        const userFindOne = await UserService.userExistsAndCheckPassword({
            email: 'Kennedi_Corkery53@gmail.com',
            password: 'sfSRti2YFUkNCpQ'
        })
        expect(userFindOne).toBe(true)
    })

})