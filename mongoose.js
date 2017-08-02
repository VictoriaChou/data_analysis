var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bingpic');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('success')
});

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
//console.log(Kitten)
var silence = new Kitten({ name: 'Silence' });

Kitten.find({name:'happy'},( error, kittens) => {
	if(error) return console.error(err);
	console.log(kittens); 
});