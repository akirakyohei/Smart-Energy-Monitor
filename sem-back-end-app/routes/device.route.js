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
 *                          startMonth:
 *                              type: date
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


/**
 * @swagger
 * /api/device:
 *  get:
 *      summary: 
 *      tags: [Device]
 *      parameters: [
 *          {
 *              name: perPage,
 *              in: query,
 *              type: string,
 *              required: true
 *          },
 *          {
 *              name: page,
 *              in: query,
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
 *                                      page:
 *                                          type: number
 *                                      pages:
 *                                          type: number
 *                                      perPage:
 *                                          type: number
 *                                      devices:
 *                                          type: array
 *                                          items:
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
router.get('/', deviceController.getDevicePaginate);

/**
 * @swagger
 * /api/device/{id}:
 *  get:
 *      summary: 
 *      tags: [Device]
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
 *                                      devices:
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
router.get('/:id', deviceController.getDeviceDetail);


/**
 * @swagger
 * /api/device/connection-log/{id}:
 *  get:
 *      summary: 
 *      tags: [Device]
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
 *                                      log:
 *                                          type: array
 *                                          items: 
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
router.get('/connection-log/:id', deviceController.getDeviceConnectionlog);



module.exports = router;