const router = require('express').Router();
const model = require('../model/item');
const Controller = require('../controller/item');
const fs = require('fs');
const upload = require('../utils/storage');


const controller = new Controller(model, fs);

router.get('/items', async (req, res) => {
  try {
    const result = await controller.getAll(req.query.page);
    if(result.length > 0) return res.status(200).json(result);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
});

router.get('/items/search', async(req, res) => {
  try {
    const result = await controller.search(req.query.page, req.query.words);
    if(result.length > 0) return res.status(200).json(result);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    return res.status(200).json(result); 
  } catch (error) {
    return res.status(404).end();
  }
});

router.post('/item', upload.any(), async (req, res) => {
  try{
    console.log(req.files);
    const item = req.body;
    item.images = [];
    await req.files.forEach(element => {
      item.images.push(element.originalname);
    });
    const result = await controller.create(item);
    return res.status(201).json(result);
  } catch(error) {
    return res.status(500).json({ err: error.message });
  }
});

router.put('/item/:id', async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});
router.patch('/item/:id', async(req, res) => {
  try {
    const result = await controller.changePriority(req.params.id, req.params.priority);
    return res.status(200).json(result);;
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
  
});

router.delete('/item/:id', async (req, res) => {
  try {
    const result = await controller.delete(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;