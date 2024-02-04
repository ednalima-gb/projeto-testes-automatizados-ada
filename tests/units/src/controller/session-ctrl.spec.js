const SessionController = require('../../../../src/controllers/session-ctrl');
const SessionService = require('../../../../src/services/session-service');
const UserService = require('../../../../src/services/user-service');
const Email = require('../../../../src/utils/email-validator');

jest.mock('../../../../src/services/session-service');
jest.mock('../../../../src/services/user-service');
jest.mock('../../../../src/utils/email-validator');

const mockEmail = 'rodrigobueno@email.com';
const mockPassword = 'senha123';

const req = {
  body: {
    email: mockEmail,
    password: mockPassword,
  },
};

describe('SessionController', () => {
  it('should return a token if email and password are valid', async () => {
    const req = {
      body: {
        email: 'rodrigo@email.com',
        password: 'senha123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const token = 'token';
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockResolvedValue(true);
    SessionService.generateToken.mockResolvedValue(token);

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  it('should return 400 if email is invalid', async () => {
    const req = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Email.isValid.mockReturnValue(false);

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith('Email inválido');
  });

  it('should return 400 if password is invalid', async () => {
    const req = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockResolvedValue(false);

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('Usuário não encontrado');
  });

  it('should return 400 if password is not provided', async () => {
    const req = {
      body: {
        email: mockEmail,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockResolvedValue(true);

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Senha inválida');
  });

  it('should return 404 if user does not exist', async () => {
    const req = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockResolvedValue(null);

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('Usuário não encontrado');
  });

  it('should return the error status and message if an error occurs', async () => {
    const req = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockError = { status: 500, message: 'Server Error' };
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockImplementation(() => {
      throw mockError;
    });

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(mockError.status);
    expect(res.json).toHaveBeenCalledWith(mockError.message);
  });

  test('Teste para retornar erro 500', async () => {
    const req = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Email.isValid.mockReturnValue(true);
    UserService.userExistsAndCheckPassword.mockRejectedValue('error');

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('Server Error');
  });
});
