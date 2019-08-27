var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var route = express.Router();
var User = require('./models/user.model');


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//start mongoDB
mongoose.connect("mongodb://admin:admin123@ds235850.mlab.com:35850/leave_management", { useNewUrlParser: true }).then(
    (res) => {
        console.log("Connected to Database Successfully.");
    }
).catch(() => {
    console.log("Conntection to database failed.");
});

var originsWhitelist = [
    'https://murmuring-springs-71280.herokuapp.com'
    ];  
    var corsOptions = {
    origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    },
    credentials:true
    }
    app.use(cors(corsOptions));

//end mongoDB

route.get('/',function(req,res){
    res.json({message : "Hello world"})
})

route.get('/users',function(req,res){
	console.log("hiiii")
    User.find({},function(err,users){
        if(err){
            console.log('The error is ',err);
            return;
        }
		console.log("result", users)
        res.json({data : users})
    })
})

route.post('/users',function(req,res){
    console.log('The request is ',req.body)
User.create(req.body,function(err,user){
	console.log("error is here", err ,"or result", user);
if(err){
    console.log('The err is -----> ',err);
    return;
}
res.json({message : 'User created'})
})
})


app.use('/api',route);

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
    console.log("Listening on --- Port 3000");
});    