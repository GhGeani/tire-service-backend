const router = require('express').Router();
const model = require('../model/item');
const Controller = require('../controller/item');
const controller = new Controller(model);

router.get('/items', async (req, res) => {
  try {
    const result = await controller.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    return res.status(200).json(result); 
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.post('/item', async (req, res) => {
  try{
    const result = await controller.create(req.body);
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
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;