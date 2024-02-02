const SessionController = require('../../../src/controllers/session-ctrl')

 const emailMock = (email) => true
 const passwordMock = (password) => true
 const userExistsAndCheckPasswordMock = (email, password) => true


describe('Testar SessionController', () => {
    const reqMock = {
        body: {
            email: 'teste@teste.com',
            password: '123456'
        }
    }

    const resMock = {
        status: jest.fn(() => {
            return resMock
        }),
        json: jest.fn()
    }

    it('Deve retornar o status 200 e o json com o token', async() => {
        

        // const ValidatorEmailGetSpy = await jest.spyOn(Email, 'isValid').mockImplementation(emailMock)
    

        await SessionController.create(reqMock, resMock)
        // expect(ValidatorEmailGetSpy).toHaveReturnedWith(true)
        expect(resMock.status).toHaveBeenCalledWith(200)
    })
})