const mysql = require("mysql");
require('dotenv').config({ path: `${__dirname}/.env` })

// Mysql Connection
var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_N,
    password: process.env.PASS
})

con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("database connected....")
    }
})

// Knex connection
var knex = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.HOST,
        user: process.env.USER_N,
        password: process.env.PASS,
        database: process.env.DB_DATA
    }
});

// Knex Schema for Create Table
knex.schema.createTable('user', (table) => {
    table.increments('employee_id').primary();
    table.string('FirstName', 255).notNullable()
    table.string('lastName', 255).notNullable()
    table.string('Email', 255).notNullable()
    table.string('Password', 255).notNullable()
    table.string('OrganizationName', 255).notNullable()
}).then((data) => {
    console.log();
}).catch((err) => {
    console.log("The user table is already created ....");
});

module.exports = knex;