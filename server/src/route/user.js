const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../core/config/configs');

const model = require('../model/user');
const Controller = require('../controller/user');

const controller = new Controller(model);

router.post('/login', async (req, res) => {
  try {
    const { correct, user} = await controller.login(req.body);
    if(correct) {
      const token = jwt.sign({ username: user.username }, config.secret.key);
      return res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const result = await controller.register(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;