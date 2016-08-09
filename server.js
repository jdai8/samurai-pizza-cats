const express = require('express');
const readCSV = require('./csv_Reader');
const parseCSV = require('./src/parse');
const parseCommand = require('./src/witai');
const getFilter = require('./src/getFilter');
const app = express();

const array = parseCSV(readCSV()).slice(0,500);

app.get('/query', function(request, response) {

  parseCommand(request.query.input).then(filter => {

    // console.log('hello');
    // console.log(array.filter(filter));

    response.send(array.filter(filter));
  });
});

const PORT = 80;
app.listen(PORT, function() {
  console.log(`Express started on port ${PORT}`);
});
