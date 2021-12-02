const express = require('express');
const router = express.Router();
const meterPowerController = require('../controllers/meterPower.controller');

/**
 * @swagger
 * /api/meter/hour/{id}:
 *  get:
 *      summary: 
 *      tags: [Meter]
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          },
 *          {
 *              name: startTime,
 *              in: query,
 *              type: date,
 *              required: true
 *          },
 *          {   
 *              name: endTime,
 *              in: query,
 *              type: date,
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
router.get('/hour/:id', meterPowerController.getMeterPowerByHour);

/**
 * @swagger
 * /api/meter/date/{id}:
 *  get:
 *      summary: 
 *      tags: [Meter]
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          },
 *          {
 *              name: startTime,
 *              in: query,
 *              type: date,
 *              required: true
 *          },
 *          {   
 *              name: endTime,
 *              in: query,
 *              type: date,
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
router.get('/date/:id', meterPowerController.getMeterPowerByDate);


module.exports = router;