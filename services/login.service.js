// Service -> Repository

const LoginRepository = require('../repositories/login.repository.js');
const ManageJWT = require('../helper/manageJWT');

class LoginService {
  loginRepository = new LoginRepository();
  manageJWT = new ManageJWT();

  isLoginPossible = async (nickname, password) => {
    const userInfo = await this.loginRepository.findUserInfo(nickname);
    if (!userInfo) throw new Error('등록되지 않은 닉네임입니다.');
    if (password !== userInfo['password']) throw new Error('비밀번호가 일치하지 않습니다');

    const result = {
      isUserValid: true,
      accessToken: this.manageJWT.createAccessToken(nickname),
      refreshToken: this.manageJWT.createRefreshToken(),
    };
    return result;
  };

  storeRefreshToken = async (refreshToken, nickname) => {
    await this.loginRepository.storeToken(refreshToken, nickname);
  };

  deleteRefreshToken = async (refreshToken) => {
    await this.loginRepository.deleteRefreshToken(refreshToken);
  };
}

module.exports = LoginService;
