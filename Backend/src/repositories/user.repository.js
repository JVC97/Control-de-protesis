const BaseRepository = require("./base.repository");
let _user = null;
let _protesis = null;
class UserRepository extends BaseRepository {
  constructor({ User, Protesis }) {
    super(User);
    _user = User;
    _protesis=Protesis;
  }

  async getUserByEmail(email) {
    return await _user.findOne({ email });
  }

}

module.exports = UserRepository;
