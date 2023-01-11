const { Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  console.log(`🔑 authorization: ${authorization}`);

  if (!authToken || authType !== 'Bearer') {
    return res.status(401).send({
      errorMessage: '🧆로그인 후 이용 가능한 기능입니다.(토큰이 없거나 Bearer Auth가 아닙니다)',
    });
  }

  try {
    const { nickname } = jwt.verify(authToken, SECRET_KEY);
    console.log(`🔑nickname: ${nickname}`);

    const nameInServer = await Users.findOne({ wherer: { name: nickname } });

    console.log(`🔑nameInServer: ${JSON.stringify(nameInServer)}`);

    res.locals.nickename = name;
    res.locals.userId = userId;

    console.log(`🔑 nickname (${res.locals.nickename}) 님이 이용중입니다.`);
    console.log(`🔑 userId (${res.locals.userId}) 님이 이용중입니다.`);
  } catch (error) {
    console.log(`🔑 error ${error}`);
    return res.status(401).send({ errorMessage: '토큰 인증 실패' });
  }

  next();
};
