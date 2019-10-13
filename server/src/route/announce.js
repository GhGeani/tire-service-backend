const router = require('express').Router();

const Controller = require('../controller/announce')
const model = require('../model/announce');
const _isAuth = require('../utils/_isAuth');

const controller = new Controller(model);

router.get('/announces', async (req, res) => {
  try {
    const result = await controller.getAll(req.query.page);
    if(result.length > 0) 
      return res.status(200).json(result);
    return res.status(204).end();
  } catch (error) {
      return res.status(500).end();
    }
});

router.get('/announce/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    if(result) return res.status(200).json(result); 
  } catch (error) {
    return res.status(404).end();
  }
});

router.post('/announce', _isAuth, async (req, res) => {
  try {
    const result = await controller.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).end();
  }
});

router.put('/announce/:id', async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    if(result) return res.status(201).json(result);
    return res.status(404).end();
  } catch (error) {
    return res.status(500).end();
  }
});

router.delete('/announce/:id', async (req, res) => {
  try {
    const result = await controller.delete(req.params.id);
    if(result) return res.status(200).end();
    return res.status(404).end();
  } catch (error) {
    return res.status(500).end();
  }
});

module.exports = router;