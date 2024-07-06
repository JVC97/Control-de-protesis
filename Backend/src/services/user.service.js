const BaseService = require("./base.service");
let _userRepository = null,
_protesisRepository = null;

class UserService extends BaseService {
  constructor({ UserRepository , ProtesisRepository}) {
    super(UserRepository);
    _userRepository = UserRepository;
    _protesisRepository=ProtesisRepository;
  }

  async getUserByEmail(email) {
    return await _userRepository.getUserByEmail(email);
  }

}

module.exports = UserService;
