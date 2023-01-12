// Service -> Repository

const SignupRepository = require('../repositories/signup.repository.js');
const ValidateText = require('../helper/validate.text.js');

class SignupService {
  signupRepository = new SignupRepository();
  validateText = new ValidateText();

  isSignupPossible = async (nickname, password, confirm) => {
    // # 412 닉네임이 중복된 경우
    const isExistUser = await this.signupRepository.findUserInfoByName(nickname);
    if (isExistUser) throw new Error('Error 412, 중복된 닉네임입니다');

    // # 412 입력-확인 비밀번호가 일치하지 않는 경우
    if (password !== confirm) throw new Error('Error 412, 패스워드와 확인용 패스워드가 다릅니다.');

    // # 412 닉네임 형식이 잘못된 경우
    const validateResult = await this.validateText.validateSignupText(nickname, password);
    console.log(validateResult);

    // # 412 password에 닉네임이 포함되어있는 경우
    if (password.split(nickname).length > 1) throw new Error('Error 412, 패스워드에 닉네임이 포함되어 있습니다.');

    return true;
  };

  signupUser = async (nickname, password) => {
    await this.signupRepository.signupUser(nickname, password);
  };
}

module.exports = SignupService;
