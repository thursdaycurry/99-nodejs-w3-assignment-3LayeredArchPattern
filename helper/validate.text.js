const Joi = require('joi');

class ValidateText {
  validateSignupText = async (nickname, password) => {
    try {
      const schema = Joi.object({
        nickname: Joi.string().alphanum().min(3),
        password: Joi.string().min(4),
      });

      await schema.validateAsync({
        nickname: nickname,
        password: password,
      });
    } catch (error) {
      throw new Error('Error 412, 닉네임 또는 패스워드의 형식에 문제가 있습니다.');
    }
  };
}

module.exports = ValidateText;
