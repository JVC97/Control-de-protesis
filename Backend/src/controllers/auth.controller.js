let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const { body } = req;
    const createdUser = await _authService.signUp(body);
    return res.status(201).send(createdUser);
  }

  async signIn(req, res) {
    const { body } = req;
    const creds = await _authService.signIn(body);
    return res.send(creds);
  }

  async recoverPassword(req, res){
    const {body} = req;
    const service = await _authService.recoverPassword(body);
    return res.send(service);
  }
  async recuperaPassword(req, res){
    const {body} = req;
    const service = await _authService.recuperaPassword(body);
    return res.send(service);
  }
}

module.exports = AuthController;
