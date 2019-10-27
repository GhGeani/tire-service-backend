const router = require('express').Router();
const model = require('../model/slide');
const Controller = require('../controller/slide');
const fs = require('fs');
const storage = require('../utils/storage');

const controller = new Controller(model, fs);

router.get('/slides', async (req, res) => {
  try {
    const result = await controller.getAll();
    if(result.length > 0) return res.status(200).json(result);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
});

router.post('/slide', storage.upload(600, 800), async (req, res) => {
  try{
    const item = req.body;
    item.img = req.files[0].originalname
    const result = await controller.create(item);
    return res.status(201).json(result);
  } catch(error) {
    return res.status(500).json({ err: error.message });
  }
});

router.delete('/slide/:id', async (req, res) => {
  try {
    storage.remove(req.params.id);
    const result = await controller.delete(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;