class ValidateForm {
  body = (input) => {
    if (Object.keys(input).length !== 2) throw new Error('π«£ Error 412, body λ°μ΄ν° νμμ΄ μ¬λ°λ₯΄μ§ μμ΅λλ€');
  };

  title = (input) => {
    if (!input) throw new Error('π«£ Error 412, title λ°μ΄ν° νμμ΄ μ¬λ°λ₯΄μ§ μμ΅λλ€');
    if (!input.trim()) throw new Error('π«£ Error 400, title λ΄μ©μ μλ ₯ν΄μ£ΌμΈμ');
  };

  content = (input) => {
    if (!input) throw new Error('π«£ Error 400, content λ°μ΄ν° νμμ΄ μ¬λ°λ₯΄μ§ μμ΅λλ€');
    if (!input.trim()) throw new Error('π«£ Error 400, content λ΄μ©μ μλ ₯ν΄μ£ΌμΈμ');
  };
}
module.exports = ValidateForm;
