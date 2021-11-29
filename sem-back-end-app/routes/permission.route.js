const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission.controller');

/**
 * @swagger
 * /api/permission/{id}:
 *  get:
 *      summary: 
 *      tags: [Permission]
 *      description: "signup by customer without admin role"
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          }
 *          ]
 *
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                 
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string 
 *                              error:
 *                                  type: string
 * 
 *                      
 *                  
 *                  
 */
router.get('/:id', permissionController.getPermissionById);



/**
 * @swagger
 * /api/permission:
 *  get:
 *      summary: 
 *      tags: [Permission]
 *      description: "signup by customer without admin role"
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      permissions:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:    
 *                                                  _id:
 *                                                      type: string
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                 
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string 
 *                              error:
 *                                  type: string
 * 
 *                      
 *                  
 *                  
 */
router.get('/', permissionController.getAllPermission);

module.exports = router;