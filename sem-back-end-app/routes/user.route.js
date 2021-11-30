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

/**
 * @swagger
 * /api/user/employee:
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
 *                                      employees:
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
router.get('/employee', userController.getEmployeePaginate);




/**
 * @swagger
 * /api/user/customer/{id}:
 *  get:
 *      summary: 
 *      tags: [User]
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          },
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
 *                                      username:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                                      firstName:
 *                                          type: string 
 *                                      fullName:
 *                                          type: string
 *                                      province:
 *                                          type: string
 *                                      district:
 *                                          type: string
 *                                      village:
 *                                          type: string
 *                                      phone:
 *                                          type: string
 *                                      address:
 *                                          type: string
 *                                      birthday:
 *                                          type: date
 * 
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
router.get('/customer/:id', userController.getCustomerDetailById);


/**
 * @swagger
 * /api/user/employee/{id}:
 *  get:
 *      summary: 
 *      tags: [User]
 *      parameters: [
 *          {
 *              name: id,
 *              in: path,
 *              type: string,
 *              required: true
 *          },
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
 *                                      username:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                                      firstName:
 *                                          type: string 
 *                                      fullName:
 *                                          type: string
 *                                      phone:
 *                                          type: string
 *                                      address:
 *                                          type: string
 *                                      birthday:
 *                                          type: date
 * 
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
router.get('/employee/:id', userController.getEmployeeDetailById);





module.exports = router;