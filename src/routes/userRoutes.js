const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/page', userController.getByPage); // 新增分页查询路由
router.get('/:id', userController.getDetailById); // 新增查询详情路由


module.exports = router;
