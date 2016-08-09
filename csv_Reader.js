var fs = require('fs');
var csv = require('fast-csv');
 function logit(value){
    console.log(value);
}
fs.createReadStream('MOCK_DATA.csv')
    .pipe(csv())
    .on('data',function(data){
        var print = logit(data);
        return print;
    })
