const { Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  // 에러 처리 : 토큰 없거나, Bearer 토큰 아닐 경우
  if (!authToken || authType !== 'Bearer') {
    return res.status(401).send({
      errorMessage: '🧆로그인 후 이용 가능한 기능입니다.(토큰이 없거나 Bearer Auth가 아닙니다)',
    });
  }

  try {
    const { nickname } = jwt.verify(authToken, process.env.SECRET_KEY);
    const nameInServer = await Users.findOne({ where: { name: nickname } });

    res.locals.nickename = nickname;
    res.locals.userId = nameInServer['userId'];

    console.log(`🔑 nickname (${res.locals.userId}번 ${res.locals.nickename}) 님이 이용중입니다.`);
  } catch (error) {
    console.log(`🔑 error ${error}`);
    return res.status(401).send({ errorMessage: '토큰 인증 실패' });
  }

  next();
};
