const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');



/**
 * @swagger
 * /api/img/{image}:
 *  get:
 *      summary: 
 *      tags: [Image]
 *      parameters: [
 *          {
 *              name: image,
 *              in: path,
 *              type: string,
 *              required: true
 *          }
 *          ]
 *
 *      responses:
 *          200:
 *              content:
 *                  image/*:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: string
 *                                  format: binary
 *                                 
 *          404:
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
router.get('/:image', imageController.getImage);

module.exports = router;