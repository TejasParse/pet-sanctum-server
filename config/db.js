const mongoose = require("mongoose");
console.log(process.env.DB_LINK);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected" + ` ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
