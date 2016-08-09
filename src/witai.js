//required dependencies and key
const Wit = require('../node_modules/node-wit/lib/wit.js').Wit;
const client = new Wit({accessToken: 'S6CR2CDZVXD7W7RIRSSCLCCMWQLPCMC4'});

//the user's command, !subject to change -> get it from front-end!
var command = 'give me people who are older than 26';

/*Some possible entities within the JSON.
we need to predefine these variables as nulls, because they will possibly be changed later.*/
var gender = null;
var genderConfidence = null;
var genderValue = null;
var ageConfidence = null;
var ageValue = null;
var number = null;

//contacting Wit AI and retrieving the JSON format of response
client.message(command, {}).then((data) => {

  //predicate will always almost be present.
  var predicateConfidence = data.entities.predicate[0].confidence;
  var predicateValue = data.entities.predicate[0].value;

  //print out the predicates for testing
  console.log('predicates: ' + predicateConfidence + " " + predicateValue);

  //if there is gender entity, get its confidence and value.
  if(typeof data.entities.gender != 'undefined'){
  	genderConfidence = data.entities.gender[0].confidence;
  	genderValue = data.entities.gender[0].value;
  	console.log("gender: " + genderConfidence + " " + genderValue);
  }

  //if there is age entity, get its confidence and value.
  if(typeof data.entities.number != 'undefined'){
  	ageConfidence = data.entities.number[0].confidence;
  	ageValue = data.entities.number[0].value;
  	console.log("age: " + ageConfidence + " " + ageValue);
  }

}).catch(console.error);
