express = require("express");
const fs = require("fs");

var routes = require('./routes/index.js');

const hostname = 'localhost' ;
const port =  process.env.port ||  5000 ;
solan = 0;


app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use( express.static("public") );

app.use('/', routes);

app.listen( port );

console .log( `Server running at
    http://${hostname}:${port}/` );

