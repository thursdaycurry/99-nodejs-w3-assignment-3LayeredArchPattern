require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

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
    console.log(`🔑 nickname: ${nickname}`);

    const nameInServer = await Users.findOne({ wherer: { name: nickname } });

    res.locals.nickename = nameInServer['dataValues']['name'];
    res.locals.userId = nameInServer['dataValues']['userId'];

    console.log(`🔑 nickname (${res.locals.nickename}) 님이 로그인했습니다.`);
    console.log(`🔑 userId (${res.locals.userId}) 님이 로그인했습니다.`);
  } catch (error) {
    return res.status(401).send({ errorMessage: '401, 로그인에 실패했습니다' });
  }

  next();
};
