const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/MYSHOP";

const ConnectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('DataBase Connected Successfully !')
    } catch (error) {
        console.error('DataBase Connection Error', error);
        process.exit(0);
    }
}

module.exports = ConnectDB;