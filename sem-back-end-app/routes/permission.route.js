const express = require('express');
const router = express.router();
const roleController = require('../controllers/role.controller');

router.post('/', roleController.createRole);

router.get('/:id', roleController.getRoleById);

router.get('/', roleController.getAllRole);

router.put('/:id', roleController.updateRole);

router.delete("/:id", roleController.deleteRole);

module.exports = router;