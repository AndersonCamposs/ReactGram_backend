const mongoose = require('mongoose');

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('CONEXÃO BEM SUCEDIDA');
        return dbConn;
    } catch (error) {
        console.log('error')
    }
}

module.exports = conn;