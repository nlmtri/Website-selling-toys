express = require("express");
const fs = require("fs");
const sessions = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index.js');
var Database = require('./db/database.js');

const hostname = 'localhost' ;
const port =  process.env.PORT ||  5000 ;
solan = 0;


app = express();

app.use(bodyParser.json());

app.use(sessions({
    resave: true, 
    saveUninitialized: true, 
    secret: '12lj!3!je192Rr', 
    cookie: { maxAge: 999999999 }}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use( express.static("public") );

app.use('/', routes);

app.listen( port );

console .log( `Server running at ${port}` );

