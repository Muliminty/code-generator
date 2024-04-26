const express = require('express');
const router = express.Router();
const modelPropsController = require('../controllers/modelPropsController');

router.get('/', modelPropsController.getAllModelPropss);
router.post('/', modelPropsController.createModelProps);
router.put('/:id', modelPropsController.updateModelProps);
router.delete('/:id', modelPropsController.deleteModelProps);
router.get('/page', modelPropsController.getModelPropsByPage); // 新增分页查询路由


module.exports = router;
