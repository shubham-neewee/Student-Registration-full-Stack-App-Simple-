require('dotenv').config();
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect(error => {
    if(error) {
        throw new Error('Error')
    }
    console.log("DB Connected!")
})

module.exports.db = db;