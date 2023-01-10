// Service -> Repository

const SignupRepository = require('../repositories/signup.repository.js');

class SignupService {
  signupRepository = new SignupRepository();

  isSignupPossible = async (nickname, password, confirm) => {
    // # 412 닉네임이 중복된 경우
    const isExistUser = await this.signupRepository.findUserInfoByName(nickname);
    if (isExistUser) throw new Error('Error 400, 중복된 닉네임입니다');

    // # 412 입력-확인 비밀번호가 일치하지 않는 경우
    if (password !== confirm) throw new Error('Error 400, 패스워드와 확인용 패스워드가 다릅니다.');

    // # 412 닉네임(ID) 형식이 비정상적인 경우
    if (!nickname) throw new Error('Error 400, ID의 형식이 일치하지 않습니다.');

    // # 412 password 형식이 비정상적인 경우
    // {"errorMessage": "패스워드 형식이 일치하지 않습니다.}
    if (!password) throw new Error('Error 400, 패스워드의 형식이 일치하지 않습니다.');

    // # 412 password에 닉네임이 포함되어있는 경우
    // {"errorMessage": "패스워드에 닉네임이 포함되어 있습니다."}
    if (password.split(nickname).length > 1) throw new Error('Error 400, 패스워드에 닉네임이 포함되어 있습니다.');

    return true;
  };

  signupUser = async (nickname, password) => {
    await this.signupRepository.signupUser(nickname, password);
  };
}

module.exports = SignupService;
