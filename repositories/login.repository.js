// Repository <-> DB

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'love';

const { Users, UserInfos } = require('../models');

class LoginRepository {
  findUserInfo = async (nickname) => {
    return await Users.findOne({ where: { name: nickname } });
  };

  storeToken = (refreshToken, nickname) => {
    UserInfos.create({
      refreshToken,
      nickname,
    });
  };

  deleteRefreshToken = async (refreshToken) => {
    await UserInfos.destroy({ where: { refreshToken } });
  };
}

module.exports = LoginRepository;
