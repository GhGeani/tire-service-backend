const jwt = require('jsonwebtoken');
const configs = require('../core/config/configs');

module.exports = async (req, res, next) => {
  try {
    const authField = req.headers.authorization;
    if(authField) {
      const code = authField.split(' ')[1];
      await jwt.verify(code, configs.secret.key);
      next();
    } else return res.status(401).json({ err: 'Unauthorized action' });
  } catch (error) {
    return res.status(401).json({ err: error.message });
  }
}
