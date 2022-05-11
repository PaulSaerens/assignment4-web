var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/UserModel');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const workspaceRoutes = require('./routes/WorkspaceRoutes');
const session = require('express-session');

var app = express();

const databaseUri = "mongodb://root:root@tasklist-shard-00-00.jjxw0.mongodb.net:27017,tasklist-shard-00-01.jjxw0.mongodb.net:27017,tasklist-shard-00-02.jjxw0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4augxk-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(databaseUri).then(r => console.log("Connected"));


app.use(session({
    secret: "lol",
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/workspaces', workspaceRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.status(404).json({"message": "404 Not found"}).send();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send();
});

module.exports = app;
