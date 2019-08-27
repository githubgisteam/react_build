var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var route = express.Router();
var User = require('./models/user.model');


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var SolrNode = require('solr-node');
var client = new SolrNode({
    host: '10.75.65.182',
    port: '8983',
    core: 'collection2',
    protocol: 'http'
});
console.log("hiii",client )
var originsWhitelist = [
    'http://localhost:5000'
    ];
    var corsOptions = {
    origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    },
    credentials:true
    }
    app.use(cors(corsOptions));


route.get('/',function(req,res){
    res.json({message : "Hello world"})
})

route.get('/users',function(req,res){
    var strQuery = client.query().q('text:Error');
    client.search(strQuery, function (err, result) {
        if (err) {
           console.log(err);
           return;
        }
        console.log('Response:', result.response);
        res.json({data : result.response})
     });
})


app.use('/api',route);

var port = process.env.PORT || 3006;
app.listen(port, "0.0.0.0", function () {
    console.log("Listening on --- Port 3000");
});    