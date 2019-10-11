const router = require('express').Router();
const model = require('../model/info');
const Controller = require('../controller/info');
const controller = new Controller(model);
const upload = require('../utils/storage');

router.get('/infos', async (req, res) => {
  try {
    const result = await controller.getAll();
    if(result.length > 0) return res.status(200).json(result); 
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
});

router.get('/info/:id', async (req, res) => {
  try {
    const result = await controller.get(req.params.id);
    return res.status(200).json(result); 
  } catch (error) {
    return res.status(404).end();
  }
});

router.post('/info', upload.single('file'), async (req, res) => {
  try{
    let service = req.body;
    if(req.file) {
      service.img = req.file.originalname;
    }
    const result = await controller.create(service);
    return res.status(201).json(result);
  } catch(error) {
    return res.status(500).json({ err: error.message });
  }
});

router.put('/info/:id', async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    if(reuslt) return res.status(201).json(result);
    return res.status(404).end();
  } catch (error) {
    return res.status(500).end();
  }
});
router.patch('/info/:id/:priority', async(req, res) => {
  try {
    const result = await controller.changePriority(req.params.id, req.params.priority);
    return res.status(200).json(result);;
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
  
});

router.patch('/info/:id', async(req, res) => {
  try {
    const result = await controller.changeAvailability(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.delete('/info/:id', async (req, res) => {
  try {
    const result = await controller.delete(req.params.id);
    if(result) res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
});

module.exports = router;