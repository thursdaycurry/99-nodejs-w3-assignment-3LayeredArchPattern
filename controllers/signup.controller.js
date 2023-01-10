// Controller -> Service

const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;

      const result = await this.signupService.isSignupPossible(nickname, password, confirm);

      if (result) {
        await this.signupService.signupUser(nickname, password);
        res.json({ message: '회원 가입에 성공하였습니다.' });
      }
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: `${error}` });
    }
  };
}

module.exports = SignupController;
