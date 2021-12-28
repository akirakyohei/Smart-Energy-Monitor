const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const verifySignup = require("../middlewares/verifySignUp.middleware");
const upload = require('../middlewares/uploadFile.middleware.js');

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
router.get('/customer', [AuthMiddleware.verifyToken], userController.getCustomersPaginate);

/**
 * @swagger
 * /api/user/admin:
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
router.get('/admin', [AuthMiddleware.verifyToken], userController.getAdminPaginate);




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
router.get('/customer/:id', [AuthMiddleware.verifyToken], userController.getCustomerDetailById);


/**
 * @swagger
 * /api/user/admin/{id}:
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
router.get('/admin/:id', [AuthMiddleware.verifyToken], userController.getAdminDetailById);



/**
 * @swagger
 * /api/user:
 *  put:
 *      summary: 
 *      tags: [User]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          fullName:
 *                              type: boolean
 *                          image:
 *                              type: string
 *                              format: binary
 *                          address:
 *                              type: string
 *                          province:
 *                              type: string
 *                          district:
 *                              type: string
 *                          village:
 *                              type: string
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
router.put('/', [verifySignup.checkDuplicateUsernameOrEmail, upload.single("image")], userController.updateAccount);

/**
 * @swagger
 * /api/user/customer/{id}:
 *  put:
 *      summary: 
 *      tags: [User]
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
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          fullName:
 *                              type: boolean
 *                          image:
 *                              type: string
 *                              format: binary
 *                          address:
 *                              type: string
 *                          province:
 *                              type: string
 *                          district:
 *                              type: string
 *                          village:
 *                              type: string
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
router.put('/customer/:id', [verifySignup.checkDuplicateUsernameOrEmail, upload.single("image")], userController.updateCustomer);

/**
 * @swagger
 * /api/user/admin/{id}:
 *  put:
 *      summary: 
 *      tags: [User]
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
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          fullName:
 *                              type: boolean
 *                          image:
 *                              type: string
 *                              format: binary
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
router.put('/admin/:id', [verifySignup.checkDuplicateUsernameOrEmail, upload.single("image")], userController.updateAdmin);




module.exports = router;