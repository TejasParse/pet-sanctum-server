const asyncHandler = require("express-async-handler");
const { Profile }  = require("../models/Profile");
const { Pet } = require("../models/Pets");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//POST
let registerUser = asyncHandler(async (req, res) => {
	
	console.log(req.file);
	console.log(req.body);

	const imageUrl = (req.file) ? req.file.path : null;

	const { username } = req.body.username;
 
	let userExists = await Profile.findOne({ username });

	if(userExists) {
		return res.status(200).json({
			status:400,
			message: "Username already taken"
		});
	}

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	req.body.password = hashPassword;
	req.body.imageUrl = imageUrl;

	let profileData = await Profile(req.body);

	try {

		await profileData.save();
	

			res.status(201).json({
				status: 201,
				fname: profileData.fname,
			})
		
	} catch(err) {
		console.log(err);
		res.status(200).json({
			status: 400,
			message: "Error",
		});
	}

});

//GET
let getUser = asyncHandler(async (req, res) => {
	const {_id, fname, lname, phone, username,
			email, address, state, zip, city,
			imageUrl, isAdmin, adopted, rescued} = req.user
	
	res.status(200).json({id: _id, fname, lname, phone, username,
		email, address, state, zip, city,
		imageUrl, isAdmin, adopted, rescued})

	// let { id } = req.params;
	
	// console.log(id);

	// try {

	// 	const Profile1 = await Profile.findById(id);
	// 	console.log(Profile1);
	// 	res.json({
	// 		status: "200",
	// 		message: "User Found",
	// 		data: Profile1
	// 	});

	// } catch(err) {
	// 	console.log(err);
	// 	console.log("ruk jaa bc");

	// 	res.json({
	// 		"status" :"400",
	// 		"message": "User does not exist"
	// 	});
	// }
});

//DELETE
let deleteUser = asyncHandler(async (req, res) => {
	
	try {
		const tp1 = await Profile.deleteOne({
			_id: req.params.id
		});

		const newProfiles = await Profile.find({});

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

//LOGIN POST
let loginUser = asyncHandler(async (req,res)=> {
	const {username, password} = req.body
	
	const user = await Profile.findOne({username})
	if(user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			status:200,
			id: user._id,
			username: user.username,
			LoginDetails: user
		})
	}
	else {
		res.status(200).json({
			status: 400,
			message: 'Invalid credentials'
		});
	}
});

let listProfiles = asyncHandler(async (req,res)=> {

	const profilesList = await Profile.find({});
	
	
	res.status(200).json({
		status:200,
		data: profilesList
	})
	

});

let makeAdmin = asyncHandler(async (req,res)=> {

	console.log("Setting Admin");

	const profilesList = await Profile.updateOne({
		_id: req.params.id
	},
	{
		$set: {
			isAdmin: 1
		}
	})
	
	
	res.status(200).json({
		status:200,
		data: profilesList,
		message: "Admin Status Updated"
	})
	

});

let rescuedPets = asyncHandler(async (req,res)=> {

	const profilesList = await Profile.findById(req.params.id);

	const rescued = await Pet.find({ _id: { $in: profilesList.rescued } });

	console.log(rescued, "idhar bhai idhar");

	res.status(200).json({
		status:200,
		data: rescued,
		message: "Got It!"
	})
	

});



//Generate JWtoken
const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}

module.exports = {
  registerUser,
  getUser,
  deleteUser,
  loginUser,
  listProfiles,
  makeAdmin,
  rescuedPets
};
