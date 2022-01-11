const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit.controller');


/**
 * @swagger
 * /api/unit:
 *   post:
 *     summary: 
 *     tags: [Unit]
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          unit:
 *                              type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                      type: boolean
 *                  message:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          unit:
 *                              type: object
 *       500:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                          message:
 *                              type: string 
 *                          error:
 *                              type: string
 * 
 *                      
 *                  
 *                  
 */
router.post('/', unitController.createUnit);

/**
 * @swagger
 * /api/unit/{id}:
 *  get:
 *      summary: 
 *      tags: [Unit]
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
 *                                      unit:
 *                                          type: object
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
router.get('/:id', unitController.getUnitById);

/**
 * @swagger
 * /api/unit:
 *  get:
 *      summary: 
 *      tags: [Unit]
 *      parameters: [
 *          {
 *              name: name,
 *              in: query,
 *              type: string
 *          }
 *          ]
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          name:
 *                                              type: string
 *                                          description:
 *                                              type: string
 *                                          unit:
 *                                              type: object
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
router.get('/', unitController.getAllUnit);

/**
 * @swagger
 * /api/unit/{id}:
 *  put:
 *      summary: 
 *      tags: [Unit]
 *      description: "signup by customer without admin role"
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          }
 *          ]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          unit:
 *                              typr: object
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
 *                                      unit:
 *                                          type: object
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
router.put('/:id', unitController.updateUnit);

/**
 * @swagger
 * /api/unit/{id}:
 *  delete:
 *      summary: 
 *      tags: [Unit]
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
 *          204:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string                                
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
 */
router.delete("/:id", unitController.deleteUnit);

module.exports = router;