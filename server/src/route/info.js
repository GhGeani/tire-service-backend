const router = require('express').Router();
const model = require('../model/info');
const Controller = require('../controller/info');
const controller = new Controller(model);

router.get('/infos', async (req, res) => {
  try {
    const result = await controller.getAll();
    return res.status(200).json({
      no: result.no,
      result: result.data
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.get('/info/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    return res.status(200).json({
      result: result.data
    }); 
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.post('/info', async (req, res) => {
  try{
    const result = await controller.create(req.body);
    return res.status(201).json({
      msg: result.msg,
      result: result.data
    });
  } catch(error) {
    return res.status(500).json({ err: error.message });
  }
});

router.put('/info/:id', async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.status(201).json({
      msg: result.msg,
      result: result.data
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.delete('/info/:id', async (req, res) => {
  try {
    const result = await controller.delete(req.params.id);
    return res.status(201).json({
      msg: result.msg,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;