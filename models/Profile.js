const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const ProfileSchema = new mongoose.Schema({
    fname : {
        type:String,
        required: [true, 'Please add first name'],
    },
    lname : {
        type:String,
        required: [true, 'Please add last name'],
    },
    phone : {
        type: Number,
        required: [true, 'Please add phone number'],
    },
    username : {
        type: String,
        required: [true, 'Please add username'],
        unique: true,
    },
    email : {
        type: String,
        required: [true, 'Please add email'],
    },
    address : {
        type: String,
        required: [true, 'Please add address'],
    },
    state : {
        type: String,
        required: [true, 'Please add state'],
    },
    zip : {
        type: Number,
        required: [true, 'Please add zip code'],
    },
    city : {
        type: String,
        required: [true, 'Please add city'],
    },
    password : {
        type: String,
        required: [true, 'Please add password'],
    },
    imageUrl : {
        type: String,
        required: [true, 'Please add image url'],
    },
    isAdmin: {
        type: Number,
        required: true,
    },
    adopted: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }],
    rescued: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }]
});

// ProfileSchema.pre("save", async function (next) {
//   console.log(this.isModified("password"));
//   if(!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt)

// })


const Profile = mongoose.model("Profile",ProfileSchema);

module.exports.Profile = Profile;