const express = require('express');
const router = express.Router();
const { read, create, deleteAll } = require('../controllers/codes')

router.get('/codes', read);

router.post('/codes', create);

router.delete('/codes', deleteAll);

module.exports = router;
