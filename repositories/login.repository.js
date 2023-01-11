// Repository <-> DB

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'love';

const { Users, UserInfos } = require('../models');

class LoginRepository {
  findUserInfo = async (nickname) => {
    const userInfo = await Users.findOne({
      where: { name: nickname },
    });
    return userInfo;
  };

  createAccessToken = (nickname) => {
    const accessToken = jwt.sign({ nickname: nickname }, SECRET_KEY, {
      expiresIn: '600s',
    });
    return accessToken;
  };

  createRefreshToken = () => {
    const refreshToken = jwt.sign({}, SECRET_KEY, { expiresIn: '1d' });
    return refreshToken;
  };

  deleteRefreshToken = async (refreshToken) => {
    await UserInfos.destroy({ where: { refreshToken } });
  };

  storeToken = (refreshToken, nickname) => {
    UserInfos.create({
      refreshToken,
      nickname,
    });
  };
}

module.exports = LoginRepository;
