var express = require('express');
var app = express();

app.get('/query', function(request, response) {

  response.send(request.query.input);

});

const PORT = 80;
app.listen(PORT, function() {
  console.log(`Express started on port ${PORT}`);
});
