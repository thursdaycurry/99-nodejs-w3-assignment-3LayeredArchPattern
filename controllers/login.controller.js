// Controller -> Service

const LoginService = require('../services/login.service');

class LoginController {
  loginService = new LoginService();

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const prevRefreshToken = req.cookies['refreshToken'];
      const { isTokenCreated, accessToken, refreshToken } = await this.loginService.isLoginPossible(nickname, password);

      // 로그인 성공 - 토큰 발급
      if (isTokenCreated) {
        const authorization = 'Bearer ' + accessToken;
        res.cookie('authorization', authorization);
        res.cookie('refreshToken', refreshToken);

        // 기존 RefreshToken 삭제
        await this.loginService.deleteRefreshToken(prevRefreshToken);

        console.log(`🐞토큰 정상 발급 완료 -> authorization : Bearer ${accessToken}`);
        return res.status(200).json({ message: '로그인 성공', token: `Bearer ${accessToken}` });
      }

      // 로그인 실패
      return res.status(400).json({ errorMessage: `${error}` });
    } catch (error) {
      return res.status(400).json({ errorMessage: `${error}` });
    }
  };

  logout = async (req, res, next) => {
    try {
      // 리프레시 토큰 삭제
      const { refreshToken } = req.cookies;
      await this.loginService.deleteRefreshToken(refreshToken);
      return res.status(200).json({ message: '로그아웃이 정상적으로 완료되었습니다. 👋' });
    } catch (error) {
      return res.status(400).json({ errorMessage: `로그아웃 실패!` });
    }
  };
}

module.exports = LoginController;
