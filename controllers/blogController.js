const asyncHandler = require("express-async-handler");
const { Blog } = require("../models/Blogs");

let addBlog = asyncHandler(async (req, res) => {

    let imageUrl1 = (req.file) ? req.file.path : "https://hips.hearstapps.com/wdy.h-cdn.co/assets/16/11/3200x1600/1458326940-landscape-gettyimages-530330473-1.jpg?resize=1200:*"

    const newBlog = new Blog({
      imageUrl: imageUrl1,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author || "Pet Sanctum",
    });

    await newBlog
      .save()
      .then((hmm) => {
        console.log(hmm);

        res.json({
            status: 200,
            message: "Blog Added!",
            data: newBlog
        })
      })
      .catch((err) => {
        console.log(err);
        // res.redirect("/");
        res.json({
          status: 500,
          message: "Error adding blog",
        });

      });
});

let getBlog = asyncHandler(async (req,res) => {

    console.log(req.params);
    const getBlog1 = await Blog.findById(req.params.id)
    
    res.status(200).json({
      status: 200,
      message: "Blog Succesfully Retreived",
      data: getBlog1
    });
});

let deleteBlog = asyncHandler(async (req,res) => {

    const { id } = req.params;

    const tmp = await Blog.findByIdAndDelete(id);

    const newList = await Blog.find({});

    res.status(200).json({
      status: 200,
      message: "Blog Succesfully Deleted!",
      data: newList
    });
});

let listBlog = asyncHandler(async (req, res)=>{

  try {
    const listBlog = await Blog.find({});
  
    res.status(200).json({
      status: 200,
      data: listBlog
    })
  } catch(err) {
    res.status(200).json({
      status: 200,
      data: listBlog,
    });
  }


});

module.exports = {
  addBlog,
  getBlog,
  deleteBlog,
  listBlog
};
