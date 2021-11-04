const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission.controller');

router.post('/', permissionController.createPermission);

router.get('/:id', permissionController.getPermissionById);

router.get('/', permissionController.getAllPermission);

router.put('/:id', permissionController.updatePermission);

router.delete("/:id", permissionController.deletePermission);

module.exports = router;