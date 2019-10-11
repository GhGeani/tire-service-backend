const router = require('express').Router();
const path = require('path');

router.get('/files/:name', async (req, res) => {
  try {
    let options = {
      root: path.join(__dirname, '../../../public/uploads'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    await res.sendFile(req.params.name, options);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;