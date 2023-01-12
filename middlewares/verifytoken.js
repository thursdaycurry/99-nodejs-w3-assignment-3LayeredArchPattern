const ManageJWT = require('../helper/manageJWT');
const { Users, UserInfos } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const manageJWT = new ManageJWT();

  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(400).json({ message: 'refresh Token이 없습니다.' });
    if (!accessToken) return res.status(400).json({ message: 'access Token이 없습니다.' });

    const isAccessTokenValidate = manageJWT.validateAccessToken(accessToken);
    const isRefreshTokenValidate = manageJWT.validateRefreshToken(refreshToken);

    if (!isRefreshTokenValidate) return res.status(419).json({ message: 'Refresh Token이 만료되었습니다' });

    // Refresh Token : O
    // Access token : X -> give new one
    if (!isAccessTokenValidate) {
      const accessTokenId = await UserInfos.findOne({ where: { refreshToken } });
      console.log(`🐞accessTokenId['nickname']: ${accessTokenId['nickname']}`);
      if (!accessTokenId) return res.status(419).json({ message: '서버에 없는 Refresh Token 존재하지 않습니다.' });

      const newAccessToken = manageJWT.createAccessToken(accessTokenId['nickname']);
      res.cookie('accessToken', newAccessToken);
      console.log(`Middleware🧚🏼‍♀️) Access Token을 새롭게 발급했습니다.${newAccessToken}`);
    }

    // Refresh Token : O
    // Access Token : O
    const { userId } = manageJWT.getAccessTokenPayload(accessToken);
    console.log(`😀userId: ${userId}`);
    res.locals.userId = userId;

    console.log(`Middleware🧚🏼‍♀️) ${userId}님, access&refresh Token 모두 양호합니다.`);
  } catch (error) {
    return res.status(401).send({ errorMessage: '토큰 인증 실패' });
  }
  next();
};
