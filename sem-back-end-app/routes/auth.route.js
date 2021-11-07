const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifySignup = require("../middlewares/verifySignUp.middleware");


/**
 * @swagger
 * /api/auth/signup-customer:
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
 *                          email:
 *                              type: string
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
 *                                  image: 
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




router.post('/signup-customer', verifySignup.checkDuplicateUsernameOrEmail, authController.signupCustomer);


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

module.exports = router;