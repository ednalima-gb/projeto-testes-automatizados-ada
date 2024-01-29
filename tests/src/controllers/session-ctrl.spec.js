const SessionController = require('../../../src/controllers/session-ctrl')
const SessionService = require('../../../src/services/session-service')
const UserService = require('../../../src/services/user-service')
const Email = require('../../../src/utils/email-validator')

const emailMock = (email) => true

describe('Testar SessionController', () => {
    test('Deve retornar o status 200 e o json com o token', async() => {
        const reqMock = {
            body: {
                email: 'teste@teste.com',
                password: '123456'
            }
        }

        const resMock = {
            status: (status) => {
                console.log(status)
                return {
                    json: ({token}) => {
                        console.log({token})
                    }
                }
            }
        }

        const ValidatorEmailGetSpy = await jest.spyOn(Email, 'isValid').mockImplementation(emailMock)
    

        await SessionController.create(reqMock, resMock)
        expect(ValidatorEmailGetSpy).toHaveReturnedWith(true)
    })
})