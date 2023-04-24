const express = require("express");
const blogControllers = require("../controllers/blogController");
const router = express.Router();

const { storage } = require("../cloud");
const multer = require("multer");

const upload = multer({ storage });

/**
 * @swagger
 * /api/blog/:
 *   get:
 *     summary: Returns all the blogs
 *     responses:
 *       200:
 *         description: The list of blogs
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  data: 
 *                    type: array
 *                    items: 
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        imageUrl:
 *                          type: string
 *                        title: 
 *                          type: string
 *                        description: 
 *                          type: string
 *                        author: 
 *                          type: string
 */
router.get("/", blogControllers.listBlog);

/**
 * @swagger
 * /api/blog/addBlog:
 *   post:
 *     summary: Adds a Blog to the Database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties: 
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               imageUrl: 
 *                 type: string
 *     responses:
 *       200:
 *         description: The Pet Data has been added
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  message: 
 *                    type: string
 *                    example: Blog Added!
 *       500:
 *         description: Error while adding the pet
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 500
 *                  message: 
 *                    type: string
 *                    example: Error adding blog!        
 *       
 */
router.post("/addBlog", upload.single("imageUrl"), blogControllers.addBlog);

/**
 * @swagger
 * /api/blog/{blogId}:
 *   get:
 *     parameters: 
 *       -  in: path
 *          name: blogId
 *          schema: 
 *            type: string
 *          required: true
 *          description: This is the unique Blog ID
 *     summary: Get's a blog of particular id
 *     responses:
 *       200:
 *         description: Pet Data of particular ID Retreived 
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  message: 
 *                    type: string
 *                    example: Blog Succesfully Retreived
 *                  data: 
 *                    type: object
 *                    properties: 
 *                      _id: 
 *                        type: string
 *                      title:
 *                        type: string
 *                      description:
 *                        type: string
 *                      author:
 *                        type: string
 *                      imageUrl: 
 *                        type: string
 *       
 */
router.get("/:id", blogControllers.getBlog);

/**
 * @swagger
 * /api/blog/{blogId}:
 *   delete:
 *     parameters: 
 *       -  in: path
 *          name: blogId
 *          schema: 
 *            type: string
 *          required: true
 *          description: This is the unique Blog ID
 *     summary: Delete a blog of particular id
 *     responses:
 *       200:
 *         description: Pet Data of particular ID Deleted 
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  message: 
 *                    type: string
 *                    example: Blog Succesfully Deleted!
 *       
 */
router.delete("/:id", blogControllers.deleteBlog);

module.exports = router;