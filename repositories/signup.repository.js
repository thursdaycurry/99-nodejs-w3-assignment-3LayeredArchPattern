// Repository <-> DB

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'love';

const { Users, UserInfos } = require('../models');

class SignupRepository {
  findUserInfoByName = async (nickname) => {
    const userInfo = await Users.findOne({
      where: { name: nickname },
    });
    return userInfo;
  };

  signupUser = async (nickname, password) => {
    await Users.create({ name: nickname, password: password });
  };
}

module.exports = SignupRepository;
