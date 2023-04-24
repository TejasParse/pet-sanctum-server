const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    imageUrl : {
        type:String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true
    },
    author: {
        type:String,
        require: true,
    }
});

const Blog = mongoose.model("Blog",BlogSchema);

module.exports.Blog = Blog;