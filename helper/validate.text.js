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

  validatePost = async (title, content) => {
    try {
      const schema = Joi.object({
        title: Joi.string().min(5),
        content: Joi.string().min(5),
      });

      await schema.validateAsync({
        title: title,
        content: content,
      });
    } catch (error) {
      throw new Error('Error 412, 제목 또는 게시글 내용이 너무 짧습니다.');
    }
  };
}

module.exports = ValidateText;
