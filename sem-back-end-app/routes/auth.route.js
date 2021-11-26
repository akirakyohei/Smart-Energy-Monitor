const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifySignup = require("../middlewares/verifySignUp.middleware");
const upload = require('../middlewares/uploadFile.middleware.js');

/**
 * @swagger
 * /api/auth/signup-customer:
 *   post:
 *     summary: 
 *     tags: [Authentication]
 *     description: "signup by customer without admin role"    
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *                          image:
 *                              type: string
 *                              format: binary
 *                          details:
 *                              type: object
 *                              properties:
 *                                  firstName:
 *                                      type: string
 *                                  lastName:
 *                                      type: string
 *                                  fullName:
 *                                      type: string
 *                                  phone:
 *                                      type: string
 *                                  address:
 *                                      type: string
 *                                  province:
 *                                      type: string
 *                                  district:
 *                                      type: string
 *                                  village:
 *                                      type: string
 *                                  birthday:
 *                                      type: string
 *                                      format: date
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
 *                          err:
 *                              type: string
 *       404:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                          message:
 *                              type: string 
 * 
 *                      
 *                  
 *                  
 */



router.post('/signup-customer', [verifySignup.checkDuplicateUsernameOrEmail, upload.single("image")], authController.signupCustomer);


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: 
 *     tags: [Authentication]
 *     description: "signup by customer without admin role"
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
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
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          role:
 *                              type: string
 *                          permission:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          accessToken:
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


router.post('/signin', authController.signin);




/**
 * @swagger
 * /api/auth/verify/{data}:
 *  get:
 *      summary: 
 *      tags: [Authentication]
 *      parameters: [
 *          {
 *              name: data,
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
router.get('/verify/:data', authController.verify);
module.exports = router;