var express = require('express');
const debug = require('debug');
var app = express();
const path = require('path');
var mysql = require('mysql');
const bodyParser = require('body-parser');
var myConnection = require('express-myconnection');
var config = require('./config');

var toWho = '';

sayHello = function() { return 1; }

checkUserLogin = function(cookies) {

    // console.log("my condition : " + (cookies.length > 0))
    // console.log("my condition2 : " + (cookies == null))
    // console.log("len of cookies: " + (cookies.length));
    

    if (cookies.length > 0){
        return true;
    }else{
        return false; //di nakapag login
    }
}







// // for functions in ejs
// var ejs = require('ejs');
// var fs  = require('fs');
// //const file = fs.readFileSync(path.resolve(__dirname, "../file.xml"));

// apps.locals({
//   makeList  : function(list) {
//     var template = fs.readFileSync('makeList.ejs', 'utf-8');
//     return ejs.render(template, list);
//   }
// });

//body parser 

app.use(express.static('public'));
global.userRole1 = 1;

app.set('view engine', 'html');

//app.set('views', path.join(__dirname + 'public'));

var fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true
}));

var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.database
};

app.use(myConnection(mysql, dbOptions, 'pool'));

app.set('view engine', 'ejs');

var index = require('./routes/index-routes');
var users = require('./routes/users-routes');
var episodes = require('./routes/episodes-routes');
var series = require('./routes/series-routes');
var events = require('./routes/events-routes');
var booths = require('./routes/booths-routes');
var survey = require('./routes/survey-routes');
var questions = require('./routes/questions-routes');
var esurvey = require('./routes/esurvey-routes');
var equestions = require('./routes/equestions-routes');
var seasons = require('./routes/seasons-routes');
var TapNow = require('./routes/TapNow-routes');
// Express Validator Middleware for Form Validation

var expressValidator = require('express-validator');
//app.use(expressValidator());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 

var methodOverride = require('method-override');

app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        //look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}));


app.use(flash());

//app.use('/', require('./auth/auth-msal'));


app.use('/', index);
app.use('/users', users);
app.use('/episodes', episodes);
app.use('/series', series);
app.use('/events', events);
app.use('/booths', booths);
app.use('/survey', survey);
app.use('/questions', questions);
app.use('/esurvey', esurvey);
app.use('/equestions', equestions);
app.use('/seasons', seasons);
app.use('/TapNow', TapNow);

app.listen(3000, function(){
    console.log('Server running at port 3000: http://localhost:3000');
});