// middlewares/auth-middleware.js

const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const SECRET_KEY = 'love';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  console.log(`π§ req.headers.authorization(middleware): ${authorization}`);
  console.log(`π§ authType: ${authType}`);
  console.log(`π§ authToken: ${authToken}`);

  if (!authToken || authType !== 'Bearer') {
    console.log(`π§ ν ν°μ λ¬Έμ κ° μλ€`);
    res.status(401).send({
      errorMessage: 'π§λ‘κ·ΈμΈ ν μ΄μ© κ°λ₯ν κΈ°λ₯μλλ€.(ν ν°μ΄ μκ±°λ Bearer Authκ° μλ)',
    });
    return;
  }

  try {
    const { nickname } = jwt.verify(authToken, SECRET_KEY);
    console.log(`π§π§ nickname: ${nickname}`);
    const nicknameAtServer = await Users.findOne({ where: { name: nickname } });

    res.locals.nickename = nicknameAtServer['dataValues']['name'];
    res.locals.userId = nicknameAtServer['dataValues']['userId'];

    console.log(`π§π§ λΉμ μ κΈμ μ¨λ λ©λλ€. ${res.locals.user}λ`);
    console.log(`π§test: ${nicknameAtServer['dataValues']['userId']}`);
  } catch (err) {
    console.log(`π§err: ${err}`);
    res.status(401).send({
      errorMessage: 'π§ λ‘κ·ΈμΈ ν μ΄μ© κ°λ₯ν κΈ°λ₯μλλ€.(ν ν° κ²μ¦ μ€ν¨)',
    });
    return;
  }

  next();
};
