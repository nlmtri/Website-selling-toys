express = require("express");
const fs = require("fs");
const sessions = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index.js');
var Database = require('./db/database.js');

const hostname = 'localhost' ;
const port =  process.env.port ||  5000 ;
solan = 0;


app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(sessions({
    resave: true, 
    saveUninitialized: true, 
    secret: '12lj!3!je192Rr', 
    cookie: { maxAge: 60000 }}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use( express.static("public") );

app.use('/', routes);

app.listen( port );

console .log( `Server running at
    http://${hostname}:${port}/` );

