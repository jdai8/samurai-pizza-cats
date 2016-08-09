var fs = require('fs');
var csv = require('fast-csv');
function logit(value){
    console.log(value);
}

function read(){
  return fs.readFileSync('MOCK_DATA.csv', { encoding: 'utf-8' });
  // fs.createReadStream('MOCK_DATA.csv')
  //     .pipe(csv())
  //     .on('data',function(data){
  //         var print = logit(data);
  //         return data;
  //     })
};

module.exports = read;
