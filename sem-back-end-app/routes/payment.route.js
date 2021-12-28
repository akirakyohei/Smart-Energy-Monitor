const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

/**
 * @swagger
 * /api/payment/export-admin:
 *  get:
 *      summary: 
 *      tags: [Payment]
 *      parameters: [
 *          {
 *              name: aeras,
 *              in: query,
 *              type: array,
 *              items: string,
 *              required: true
 *          },
 *          {
 *              name: startDay,
 *              in: query,
 *              type: datetime,
 *              required: true
 *          },
 *          {
 *              name: endDay,
 *              in: query,
 *              type: datetime,
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
router.get('/export-admin', [], paymentController.exportPayment);


module.exports = router;