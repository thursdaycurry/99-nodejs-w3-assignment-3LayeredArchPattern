class ValidateForm {
  body = (input) => {
    if (Object.keys(input).length !== 2) throw new Error('🫣 Error 412, title 데이터 형식이 올바르지 않습니다');
  };

  title = (input) => {
    if (!input) throw new Error('🫣 Error 412, title 데이터 형식이 올바르지 않습니다');
    if (!input.trim()) throw new Error('🫣 Error 400, title 내용을 입력해주세요');
  };

  content = (input) => {
    if (!input) throw new Error('🫣 Error 400, content 데이터 형식이 올바르지 않습니다');
    if (!input.trim()) throw new Error('🫣 Error 400, content 내용을 입력해주세요');
  };
}
module.exports = ValidateForm;
