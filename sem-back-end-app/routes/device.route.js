const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');
/**
 * @swagger
 * /api/device:
 *   post:
 *     summary: 
 *     tags: [Device]
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          userId:
 *                              type: string
 *                          aeraId:
 *                              type: string
 *                          unitId:
 *                              type: string
 *                          location:
 *                              type: object
 *                              properties:
 *                                  long:
 *                                      type: number
 *                                  lat:
 *                                      type: number
 *                          description:
 *                              type: string
 *                          address:
 *                              type: string
 *                          type:
 *                              type: string
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                      type: boolean
 *                  message:
 *                      type: string
 *                  device:
 *                      type: object
 *                      properties:
 *                          mqttId:
 *                              type: string
 *                          token:
 *                              type: string
 *                          aeraId:
 *                              type: string
 *                          unitId:
 *                              type: boolean
 *                          address:
 *                              type: string
 *                          location:
 *                              type: object
 *                              properties:
 *                                  long:
 *                                      type: number
 *                                  lat:
 *                                      type: number
 *                          type:
 *                              type: string
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
router.post('/', deviceController.createDevice);

module.exports = router;