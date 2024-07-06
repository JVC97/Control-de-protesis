let _userService = null;
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async get(req, res) {
    const { body} = req;
    const { _id } = body;
    const user = await _userService.get(_id);
    return res.send(user);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const users = await _userService.getAll(pageSize, pageNum);
    return res.send(users);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedUser = await _userService.update(_id, body);
    return res.send(updatedUser);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedUser = await _userService.delete(_id);
    return res.send(deletedUser);
  }
}

module.exports = UserController;
