const asyncHandler = require("express-async-handler");
const { Pet } = require("../models/Pets");
const { Profile }  = require("../models/Profile");
require('../services/cache')
const {clearHash} = require('../services/cache')

// GET
let getPets = asyncHandler(async (req, res) => {
    let { filter } = req.params;
    let searchJson = {}
    
    if(filter!=="all") {
        searchJson = {
            type: filter
        }
    }

    try {
        const petsData = await Pet.find(searchJson).cache();

        res.json({
            status: "200",
            message: "Pets Found",
            data: petsData,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "500",
            message: "Error",
        });
    }
});

// GET
let getPetById = asyncHandler(async (req, res) => {

    let { id } = req.params;

    try {
        const petsData = await Pet.findById(id);

        res.json({
            status: "200",
            message: "Pet Found",
            data: petsData,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "500",
            message: "Error",
        });
    }
});

// POST
let addPet = asyncHandler(async (req,res) => {

    let profile = req.file;
    console.log(profile);
    const profiled = await Profile.findById(req.params.username)
    
    try {
        console.log(req.body);
        req.body.imageUrl = req.file
          ? req.file.path
          : "https://hips.hearstapps.com/wdy.h-cdn.co/assets/16/11/3200x1600/1458326940-landscape-gettyimages-530330473-1.jpg?resize=1200:*";
    
        const pet1 = new Pet(req.body);
    
        await pet1.save();
        
        profiled.rescued.push(pet1);
        await profiled.save();

        res.status(200).json({
            status: 200,
            message: "Pet has been added!",
            data: pet1
        });
        clearHash('default')

    } catch(err) {
        console.log(err);

        res.status(500).json({
          status: "500",
          message: err.message,
        });
    }


});

let searchPet = asyncHandler(async (req,res) => {

    const temp = req.query;

    console.log(temp);
    
    if(temp.search == undefined) // 
    {
        const PetsData = await Pet.find({isAdopt:-1});

        res.json({
            status:200,
            data: PetsData
        })
    }
    else 
    {

        const PetsData = await Pet.find({
            $and: [
                {
                    $or: [
                        {
                            pincode: {
                                $regex: `${temp.search}`,
                                $options: "i",
                            }
                        },
                        {
                            breed: {
                                $regex: `${temp.search}`,
                                $options: "i",
                            }
                        },
                        {
                            name: {
                                $regex: `${temp.search}`,
                                $options: "i",
                            }
                        }
                    ]
                },
                { 
                    isAdopt:-1
                },
            ]
        });

        res.json({
            status:200,
            data: PetsData
        })
    }

}) 

//DELETE
let deletePet = asyncHandler(async (req, res) => {
	
	try {
		const tp1 = await Pet.deleteOne({
			_id: req.params.id
		});

		const newProfiles = await Pet.find({});

		console.log("Inside Delete");

		res.json({
			"status": "200",
			message: "Deleted Profile Succesfully",
			data: newProfiles
		})

	} catch(err) {
		res.json({
			"status": 400,
			"message": err.message
		})
	}
});

module.exports = {
    getPets,
    getPetById,
    addPet,
    searchPet,
    deletePet
};
