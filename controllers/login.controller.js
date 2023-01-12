// Controller -> Service
const LoginService = require('../services/login.service');
const ManageJWT = require('../helper/manageJWT');

class LoginController {
  loginService = new LoginService();
  manageJWT = new ManageJWT();

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const prevRefreshToken = req.cookies.refreshToken;

      // validate nickname(ID), password
      const { isUserValid, accessToken, refreshToken } = await this.loginService.isLoginPossible(nickname, password);

      if (isUserValid) {
        // 기존 refreshToken 제거
        if (prevRefreshToken) await this.loginService.deleteRefreshToken(prevRefreshToken);

        // 쿠키 방식으로 access, freshToken 신규 발급
        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        // 고객 refreshToken은 저장소에 저장
        await this.loginService.storeRefreshToken(refreshToken, nickname);

        console.log(`🐞 토큰 정상 발급 완료------------`);
        console.log(`🐞 accessToken ${accessToken}`);
        console.log(`🐞 refreshToken ${refreshToken}`);
        return res.status(200).json({ message: '로그인 성공', token: accessToken, refreshToken: refreshToken });
      }
      return res.status(400).json({ errorMessage: `로그인에 실패하였습니다` });
    } catch (error) {
      return res.status(400).json({ errorMessage: `로그인 에러 : ${error}` });
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      await this.loginService.deleteRefreshToken(refreshToken);
      return res.status(200).json({ message: '로그아웃이 정상적으로 완료되었습니다. 👋' });
    } catch (error) {
      return res.status(400).json({ errorMessage: `로그아웃 실패!` });
    }
  };
}

module.exports = LoginController;
