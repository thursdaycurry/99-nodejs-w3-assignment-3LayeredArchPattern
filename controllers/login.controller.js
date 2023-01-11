// Controller -> Service

const LoginService = require('../services/login.service');

class LoginController {
  loginService = new LoginService();

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      // check validateId
      const { isTokenCreated, accessToken, refreshToken } = await this.loginService.isLoginPossible(nickname, password);

      console.log(`💇‍♀️ nickname: ${nickname}`);
      console.log(`🧚🏼‍♀️ isTokenCreated: ${isTokenCreated}`);
      console.log(`🧚🏼‍♀️ accessToken: ${accessToken}`);
      console.log(`🧚🏼‍♀️ refreshToken: ${refreshToken}`);

      // Todo 매번 refreshToken 재발급 해야하나?
      if (isTokenCreated) {
        res.cookie('authorization', 'Bearer ' + accessToken);
        res.cookie('refreshToken', refreshToken);
        console.log(`🐞authorization : Bearer ${accessToken}`);
        console.log('토큰 정상 발급 완료');
      }

      // # 412 해당하는 유저가 존재하지 않는 경우
      // {"errorMessage": "닉네임 또는 패스워드를 확인해주세요."}
      return res.status(200).json({
        message: '로그인 성공',
        token: `Bearer ${accessToken}`,
      });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: `${error}` });
    }
  };
}

module.exports = LoginController;
