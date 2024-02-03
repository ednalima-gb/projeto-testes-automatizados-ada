const EmailValidator = require('../../../../src/utils/email-validator');

describe('Testar EmailValidator', () => {
    test('Deve retornar true caso o email seja válido', () => {
        const res = EmailValidator.isValid('teste@teste.com')
        expect(res).toBe(true)
    })

    test('Deve retornar false caso o email seja inválido', () => {
        const result = EmailValidator.isValid('teste')
        expect(result).toBe(false)
    })

    test('Deve retornar false caso o email seja vazio', () => {
        const result = EmailValidator.isValid('')
        expect(result).toBe(false)
    })

})

