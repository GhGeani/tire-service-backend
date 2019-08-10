const router = require('express').Router();

const Controller = require('../controller/announce')
const model = require('../model/announce');

const controller = new Controller(model);

router.get('/announces', async (req, res) => {
  try {
    const result = await controller.getAll(req.query.page);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

router.get('/announce/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

router.post('/announce', async (req, res) => {
  try {
    const result = await controller.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.put('/announce/:id', async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

router.delete('/announce/:id', async (req, res) => {
  try {
    const result = await controller.delete(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

module.exports = router;