const Wit = require('../node_modules/node-wit/lib/wit.js').Wit;
const client = new Wit({accessToken: 'S6CR2CDZVXD7W7RIRSSCLCCMWQLPCMC4'});

client.message('give me people who are males', {})
.then((data) => {
  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
})

.catch(console.error);
