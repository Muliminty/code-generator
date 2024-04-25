const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/', moduleController.getAllModules);
router.post('/', moduleController.createModule);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);
router.get('/page', moduleController.getModulesByPage); // 新增分页查询路由


module.exports = router;
