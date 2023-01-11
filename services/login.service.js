// Service -> Repository

const LoginRepository = require('../repositories/login.repository.js');

class LoginService {
  loginRepository = new LoginRepository();

  isLoginPossible = async (nickname, password) => {
    // params-name DB 등록 여부 체크
    const userInfo = await this.loginRepository.findUserInfo(nickname);
    if (!userInfo) throw new Error('등록되지 않은 닉네임입니다.');

    // params-pw, db-pw 동일한지 체크
    if (password !== userInfo['password']) throw new Error('비밀번호를 다시 확인해주세요');

    console.log(`💇‍♀️ nickname: ${nickname}`);

    // jwt 토큰 생성
    const result = {
      isTokenCreated: true,
      accessToken: this.loginRepository.createAccessToken(nickname),
      refreshToken: this.loginRepository.createRefreshToken(),
    };

    // JWT 저장소 저장
    await this.loginRepository.storeToken(result.refreshToken, nickname);

    // 클라이언트 jwt 토큰 controller로 전달
    return result;
  };
}

module.exports = LoginService;
