console.log("model file");
var mongoose = require(('mongoose'));
console.log("here");

var userSchema = new mongoose.Schema({
    name : String,
    age : Number
});
console.log("after schema")
module.exports = mongoose.model('user',userSchema);