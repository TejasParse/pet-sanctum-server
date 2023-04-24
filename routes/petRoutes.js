const express = require("express");
const petControllers = require("../controllers/petController");
const router = express.Router();

const { storage } = require("../cloud");
const multer = require("multer");

const upload = multer({ storage });

router.get("/petsearch", petControllers.searchPet);

/**
 * @swagger
 * /api/pet/{filter}:
 *   get:
 *     summary: Get pets of certain type
 *     parameters: 
 *       -  in: path
 *          name: filter
 *          schema: 
 *            type: string
 *          required: true
 *          description: This is used to get certain type of pet
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
 *                    example: Pets Found!
 *                  data: 
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties: 
 *                        _id: 
 *                          type: string
 *                        name: 
 *                          type: string
 *                        type: 
 *                          type: string
 *                        sex: 
 *                          type: string
 *                        breed: 
 *                          type: string
 *                        age: 
 *                          type: integer
 *                        vaccinated: 
 *                          type: string
 *                        otherpets: 
 *                          type: string
 *                        otherhumans: 
 *                          type: string
 *                        trained: 
 *                          type: string
 *                        additional: 
 *                          type: string
 *                        imageUrl: 
 *                          type: string
 *                        owner: 
 *                          type: string
 *                        phone: 
 *                          type: string
 *                        address: 
 *                          type: string
 *                        isAdopt: 
 *                          type: string
 *                        pincode: 
 *                          type: string
 *       500:
 *         description: Error while fetching pets data
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
 *                    example: Error        
 *       
 */
router.get("/:filter", petControllers.getPets);

/**
 * @swagger
 * /api/pet/petinformation/{petid}:
 *   get:
 *     summary: Get pets of certain id
 *     parameters: 
 *       -  in: path
 *          name: petid
 *          schema: 
 *            type: string
 *          required: true
 *          description: This is used to get pet of certain id
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
 *                    example: Pet Found
 *                  data: 
 *                    type: object
 *                    properties: 
 *                        _id: 
 *                          type: string
 *                        name: 
 *                          type: string
 *                        type: 
 *                          type: string
 *                        sex: 
 *                          type: string
 *                        breed: 
 *                          type: string
 *                        age: 
 *                          type: integer
 *                        vaccinated: 
 *                          type: string
 *                        otherpets: 
 *                          type: string
 *                        otherhumans: 
 *                          type: string
 *                        trained: 
 *                          type: string
 *                        additional: 
 *                          type: string
 *                        imageUrl: 
 *                          type: string
 *                        owner: 
 *                          type: string
 *                        phone: 
 *                          type: string
 *                        address: 
 *                          type: string
 *                        isAdopt: 
 *                          type: string
 *                        pincode: 
 *                          type: string
 *       500:
 *         description: Error while fetching pets data
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
 *                    example: Error        
 *       
 */
router.get("/petinformation/:id", petControllers.getPetById);

/**
 * @swagger
 * /api/pet/addPet:
 *   post:
 *     summary: Adds a Pet to the Database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties: 
 *               name: 
 *                 type: string
 *               type: 
 *                 type: string
 *               sex: 
 *                 type: string
 *               breed: 
 *                 type: string
 *               age: 
 *                 type: integer
 *               vaccinated: 
 *                 type: string
 *               otherpets: 
 *                 type: string
 *               otherhumans: 
 *                 type: string
 *               trained: 
 *                 type: string
 *               additional: 
 *                 type: string
 *               imageUrl: 
 *                 type: Binary
 *               owner: 
 *                 type: string
 *               phone: 
 *                 type: string
 *               address: 
 *                 type: string
 *               isAdopt: 
 *                 type: string
 *               pincode: 
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
 *                    example: Pet has been added!
 *                  data: 
 *                    type: object
 *                    properties: 
 *                      name: 
 *                        type: string
 *                      type: 
 *                        type: string
 *                      sex: 
 *                        type: string
 *                      breed: 
 *                        type: string
 *                      age: 
 *                        type: integer
 *                      vaccinated: 
 *                        type: string
 *                      otherpets: 
 *                        type: string
 *                      otherhumans: 
 *                        type: string
 *                      trained: 
 *                        type: string
 *                      additional: 
 *                        type: string
 *                      imageUrl: 
 *                        type: string
 *                      owner: 
 *                        type: string
 *                      phone: 
 *                        type: string
 *                      address: 
 *                        type: string
 *                      isAdopt: 
 *                        type: string
 *                      pincode: 
 *                        type: string
 *                    
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
 *                    example: Error adding pet!        
 *       
 */
router.post("/addPet/:username", upload.single("imageUrl"), petControllers.addPet)

router.delete("/:id", petControllers.deletePet);


module.exports = router;
