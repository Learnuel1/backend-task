const {mongoose, connect } = require("mongoose");
const { getDBURL, getLOCAL_DBURL } = require("../env");

const DB_URI= getDBURL() || getLOCAL_DBURL();
const mongoConnection = async() => {
  try {
    console.log("Connecting to database...")
    mongoose.set("strictQuery", true);
    await connect(DB_URI);
    console.log("Database connected successfully...")
      
  } catch (error) {
    console.error(error)
    process.exit(-1);
  }
}

module.exports ={
  mongoConnection,
}