const mysql = require("mysql2");
const express = require("express");
const bodyParser = require('body-parser');
const {query} = require("express");
const yup = require("yup")
const {object} = require("yup");

const fs = require('fs')
const spawn = require('child_process').spawn

let tableRowSchema = yup.object().shape({
    name : yup.string().required(),
    type : yup.string().required(),
    nullable : yup.bool().required()
})

let newTableSchema = yup.object().shape({
    database: yup.string().required(),
    table: yup.string().required(),
    props : yup.array().of(tableRowSchema)
});

let dropTableSchema = yup.object().shape({
    database : yup.string().required(),
    table : yup.string().required()
})

let createDatabaseSchema = yup.object().shape({
    name : yup.string().required()
})

let tableProjectionSchema = yup.object().shape({
    database : yup.string().required(),
    table : yup.string().required(),
    property : yup.string().required(),
    operation : yup.string().required(),
    target : yup.string().required()
})

let tableEntityUpdateColumn = yup.object().shape({
    name : yup.string().required(),
    value : yup.string().required()
})

let tableEntityUpdateSchema = yup.object().shape({
    database : yup.string().required(),
    table : yup.string().required(),
    columnName : yup.string().required(),
    rowValue : yup.string().required(),
    props : yup.array().of(tableEntityUpdateColumn)
})


const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});

//Middleware
async function validateCreateTable(req, res, next) {
    try {
        req.body = await newTableSchema.validate(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        //err.message contains a proper error message
        // or you can do whatever you want
    }
}

async function validateCreateDatabase(req, res, next) {
    try {
        req.body = await createDatabaseSchema.validate(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        //err.message contains a proper error message
        // or you can do whatever you want
    }
}

async function validateDropTable(req, res, next) {
    try {
        req.body = await dropTableSchema.validate(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        //err.message contains a proper error message
        // or you can do whatever you want
    }
}

async function validateTableProjection(req, res, next) {
    try {
        req.body = await tableProjectionSchema.validate(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        //err.message contains a proper error message
        // or you can do whatever you want
    }
}

async function validateUpdateTable(req, res, next) {
    try {
        req.body = await tableEntityUpdateSchema.validate(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        //err.message contains a proper error message
        // or you can do whatever you want
    }
}

function getPropsQuery(props){
    let result = "id INT AUTO_INCREMENT PRIMARY KEY,"
        for (let i = 0; i < props.length; i++) {
            let sigleProperty = ""
            if (props[i].nullable){
                sigleProperty = props[i].name + " " + props[i].type + ","
            }else {
                sigleProperty = props[i].name + " " + props[i].type + " NOT NULL" + ","
            }
            result = result + sigleProperty
        }
    return result.slice(0, result.length-1)
}

function getUpdatePropsQuery(props){
    let result = ""
    for (let i = 0; i < props.length; i++) {
        let sigleProperty = ""
        sigleProperty = "`" + props[i].name + "`='" + props[i].value + "',"
        result = result + sigleProperty
    }
    return result.slice(0, result.length-1)
}

// POST section
app.post("/database/create", validateCreateDatabase, function (req, res){
    const body = req.body;
    pool.query("CREATE DATABASE " + body.name, function(err, data) {
            console.log(err)
            res.sendStatus(200)
    });
})

app.post("/database/table/create", validateCreateTable, function (req, res){
    const body = req.body
    pool.query("USE " + body.database + "; CREATE TABLE IF NOT EXISTS " + body.table + "(" + getPropsQuery(body.props) + ");", function (err){
            console.log(err)
            res.sendStatus(200);
    })

})

app.post("/database/table/drop", validateDropTable, function (req, res){
    const body = req.body
    pool.query("USE " + body.database + "; DROP TABLE " + body.table + ";", function (err){
            console.log(err)
            res.sendStatus(200);
    })
})

app.get("/database/:database", function (req, res){
    const database = req.params.database
    pool.query("USE " + database + ";\n" +
            "SELECT TABLE_NAME AS table_name,\n" +
            "'" + database + "' AS databaseName \n" +
            "FROM INFORMATION_SCHEMA.TABLES\n" +
            "WHERE TABLE_SCHEMA = DATABASE();", function (err, data) {
                res.send(data[1])
        })
})

app.post("/database/table", validateDropTable ,function (req, res){
    const body = req.body

    pool.query("USE " + body.database + "; SELECT * FROM " + body.table + ";", function (err, data){

            const uniqueKeys = data[1].reduce(function (acc, obj) {
                return acc.concat(Object.keys(obj).filter(key => acc.indexOf(key) === -1));
            }, []);
            const response = {
                uniqueKeys : uniqueKeys,
                data: data[1]
            }
            res.send(response)

    })

})

app.post("/database/projection", validateTableProjection, function (req, res){
    const body = req.body
    pool.query("USE " + body.database + "; SELECT * FROM " + body.table + " WHERE `" + body.property + "`" + body.operation + "\"" + body.target + "\" ;", function (err, data){

        console.log(err)
        const uniqueKeys = data[1].reduce(function (acc, obj) {
            return acc.concat(Object.keys(obj).filter(key => acc.indexOf(key) === -1));
        }, []);
        const response = {
            uniqueKeys : uniqueKeys,
            data: data[1]
        }
        res.send(response)

    })
})

app.post("/database/table/edit", validateUpdateTable, function (req, res){
    const body = req.body
    pool.query("USE " + body.database + "; UPDATE " + body.table + " SET " + getUpdatePropsQuery(body.props) + " WHERE `" + body.columnName + "`='" + body.rowValue + "';", function (err){
            console.log(err)
            res.sendStatus(200)
    })
})

app.get("/database", function (req, res){

    pool.query("SHOW databases", function (err, data){
        console.log(err)
        res.send(data)
    })

})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});