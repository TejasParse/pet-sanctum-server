const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    sex: {
        type: String,
        required:true,
        default: "NA"
    },
    breed: {
        type: String,
        required:true,
        default: "NA"
    },
    age: {
        type: Number,
        required:true,
    },
    vaccinated: {
        type: String,
        required:true,
        default: "NA"
    },
    otherpets: {
        type: String,
        required: true,
        default: "NA"
    },
    otherhumans: {
        type: String,
        required:true,
        default: "NA"
    },
    trained: {
        type: String,
        required:true,
        default: "NA"
    },
    additional: {
        type: String,
        required:true,
        default: "NA"
    },
    imageUrl: {
        type: String,
        required:true,
    },
    owner: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    isAdopt: {
        type: String,
        required: true,
        default:"-1"
    },
    pincode: {
        type: String,
        required: true
    }
});

const Pet = mongoose.model("Pet",PetSchema);

module.exports.Pet = Pet;