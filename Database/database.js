
const mongoose = require('mongoose')
const path = require('path')
module.exports = async (req, res) => {

    //Set up default mongoose connection

    const MONGODB_URI = process.env.MONGODB_URI
    mongoose.set("strictQuery", false);

    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    // mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)

    db.on('connected', console.log.bind(console, 'MongoDB connected Successful to Voting System DB:'));

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}