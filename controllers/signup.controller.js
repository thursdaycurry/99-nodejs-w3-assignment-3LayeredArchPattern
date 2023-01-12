// Controller -> Service

const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      if (!nickname || !password || !confirm) return res.status(400).json({ errorMessage: `회원정보를 입력해주세요` });

      const signupResult = await this.signupService.isSignupPossible(nickname, password, confirm);

      // Create Account
      if (signupResult) {
        await this.signupService.signupUser(nickname, password);
        res.status(201).json({ message: '회원가입에 성공하였습니다.' });
      }
    } catch (error) {
      return res.status(400).json({ errorMessage: `회원가입에 실패했습니다` }); // # 400 예외 케이스에서 처리하지 못한 에러
    }
  };
}

module.exports = SignupController;
