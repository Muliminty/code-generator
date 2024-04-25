const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.post('/createTable', dbController.createTable);
router.delete('/dropTable', dbController.dropTable);
router.post('/insertData', dbController.insertData);
router.post('/fetchData', dbController.fetchData);

module.exports = router;