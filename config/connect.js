const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose.connect(url, {/*here we can edit the connection, like say if we want it to be read-only or something like that*/});
}

module.exports = connectDB;