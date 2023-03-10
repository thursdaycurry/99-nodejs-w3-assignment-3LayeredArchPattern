const express = require('express');

const Joi = require('joi');

const schema = Joi.object({
  nickname: Joi.string().alphanum().min(3),
  password: Joi.string().min(4),
});

const router = express.Router();

const { Users } = require('../models');

// * νμκ°μ API
router.post('/signup', async (req, res) => {
  try {
    const { nickname, password, confirm } = req.body;

    // Joi validator
    console.log(`πvalidated req: ${await schema.validateAsync({ nickname: nickname, password: password })}`);

    // # 412 λλ€μ νμμ΄ λΉμ μμ μΈ κ²½μ°
    if (!nickname) return res.status(400).json({ errorMessage: 'λλ€μμ νμμ΄ μΌμΉνμ§ μμ΅λλ€.' });

    // # 412 passwordd μΌμΉνμ§ μλ κ²½μ°
    if (password !== confirm) return res.status(400).json({ errorMessage: 'ν¨μ€μλμ νμΈμ© ν¨μ€μλκ° λ€λ¦λλ€.' });

    // # 412 password νμμ΄ λΉμ μμ μΈ κ²½μ°
    if (!password) return res.status(400).json({ errorMessage: 'ν¨μ€μλ νμμ΄ μΌμΉνμ§ μμ΅λλ€.' });

    // # 412 passwordμ λλ€μμ΄ ν¬ν¨λμ΄μλ κ²½μ°
    if (password.split(nickname).length > 1) return res.status(400).json({ errorMessage: 'ν¨μ€μλμ λλ€μμ΄ ν¬ν¨λμ΄ μμ΅λλ€.' });

    // # 412 λλ€μμ΄ μ€λ³΅λ κ²½μ°
    const isExistNick = await Users.findOne({ where: { name: nickname } });
    if (isExistNick) {
      return res.status(400).json({ errorMessage: 'μ€λ³΅λ λλ€μμλλ€.' });
    } else {
      await Users.create({
        name: nickname,
        password: password,
      });
      return res.json({ message: 'νμ κ°μμ μ±κ³΅νμμ΅λλ€.' });
    }
    // # 400 μμΈ μΌμ΄μ€μμ μ²λ¦¬νμ§ λͺ»ν μλ¬
    return res.status(400).json({ errorMessage: 'μμ²­ν λ°μ΄ν° νμμ΄ μ¬λ°λ₯΄μ§ μμ΅λλ€.' });
  } catch (error) {
    return res.status(400).json({ errorMessage: 'κ²μκΈ μμ±μ μ€ν¨νμμ΅λλ€.' });
  }
});

module.exports = router;
