const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: 
 *      tags: [User]
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
router.get('/', [AuthMiddleware.verifyToken], userController.getUserDetail);


/**
 * @swagger
 * /api/user/customer:
 *  get:
 *      summary: 
 *      tags: [User]
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
 *                                      customers:
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
router.get('/customer', userController.getCustomersPaginate);

module.exports = router;