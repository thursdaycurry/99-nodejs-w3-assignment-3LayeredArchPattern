const jwt = require('jsonwebtoken');
require('dotenv').config();

class ManageJWT {
  validateAccessToken = (accesToken) => {
    try {
      jwt.verify(accessToken, process.env.SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  };

  validateRefreshToken = (refreshToken) => {
    try {
      jwt.verify(refreshToken, process.env.SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  };

  getAccessTokenPayload(accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.SECRET_KEY);
      return payload;
    } catch (error) {
      return false;
    }
  }

  createAccessToken(userId) {
    const accessToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: '120s' });
    return accessToken;
  }

  createRefreshToken() {
    const refreshToken = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '1h' });
    return refreshToken;
  }
}

module.exports = ManageJWT;
