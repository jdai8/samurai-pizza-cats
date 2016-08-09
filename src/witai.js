//required dependencies and key
const Wit = require('../node_modules/node-wit/lib/wit.js').Wit;
const fs = require('fs');

const KEY = fs.readFileSync('./wit.key', { encoding: 'utf-8' }).trim();
const client = new Wit({accessToken: KEY});

// get entities from wit ai, return a promise for the appropriate filter fn
function parseCommand(command) {

  //the user's command, !subject to change -> get it from front-end!
  command  = command || 'give me people who are older than 26'

  //contacting Wit AI and retrieving the JSON format of response
  return client.message(command, {}).then((data) => {
    console.log(data.entities);
    return getFilter(data.entities);

  }).catch(console.error);
}

function getFilter(entities) {

  let p;
  if (!entities.predicate) {
    p = { value: 'equal' };
  } else {
    p = entities.predicate.find(x => x.value !== 'equal') ||
      { value: 'equal' }
  }
  console.log('p', p);
  const predicate = predicates[p.value];

  let getter;
  if (entities.lastnamefield) {
    getter = getters.lastnamefield;
  } else if (entities.firstnamefield) {
    getter = getters.firstnamefield;
  } else if (entities.idfield) {
    getter = getters.idfield;
  } else if (entities.emailfield || entities.email) {
    getter= getters.emailfield;
  } else if (entities.gender) {
    getter = getters.gender;
  }

  let arg;
  if (entities.gender) {
    arg = entities.gender[0].value;
  } else if (entities.email) {
    arg = entities.email[0].value;
  } else if (entities.number) {
    arg = entities.number[0].value;
  } else if (entities.contact) {
    arg = entities.contact[0].value;
  }

  console.log(predicate, getter, arg);
  return x => predicate(arg)(getter(x));
}

const getters = {
  firstnamefield: x => x.first_name.toLowerCase(),
  lastnamefield: x => x.last_name.toLowerCase(),
  idfield: x => parseInt(x.id),
  emailfield: x => x.email,
  gender: x => x.gender.toLowerCase()
};

const predicates = {
  contains: arg => x => x.indexOf(arg) !== -1,
  equal: arg => x => x == arg,
  smaller: arg => x => x < arg,
  greater: arg => x => x > arg
};

module.exports = parseCommand;
