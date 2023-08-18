const router = require('express').Router();
const FormModel = require('../models/formModel');

router.post('/submit', async (req, res) => {
  const { text } = req.body;
  const entry = new FormModel({ text });
  await entry.save();
  res.status(200).send('Saved');
});

module.exports = router;
