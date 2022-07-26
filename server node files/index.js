const express = require('express')
const app = express();
const port = process.env.PORT || 8000;
const fs = require('fs');
const readline = require('readline');
const cors = require('cors');


// Add cors to be able request for data from one server to another.
app.use(cors({
    origin: ['http://localhost:3000', 'https://graphicaldemoreact.herokuapp.com']
}));

app.get('/', (req, res) => {
  res.send("Hello this is the node server");
});

app.get('/getData', (req, res) => {
    let objArray =  processLineByLine();

    // Unwrap the data from the promise 
    objArray.then(function(result) {
        console.log(result) 
        res.send(result);
     })

    
  });



async function processLineByLine() {
  // Get the file that you want to read the data  
  const fileStream = fs.createReadStream('epa-http.txt');

  // Read each line.
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  // Array that will get all objects
  let allRequestsObj = [];

  // Create the object
  const ObjLine = function (host, date, request, httpReplyCode, bytes) {
    this.host = host;
    this.date = date;
    this.request = request;
    this.httpReplyCode = httpReplyCode;
    this.bytes = bytes;
};

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // Seperate each word and add it to object.
    let obj = line.split('"');
    let ln = obj[0].split(' ');
    let ln1 = obj[1];
    let ln2 = obj[2].split(' ');

    // Parse the data to final variable
    let host = ln[0];
    let date = ln[1];
    let request = ln1;
    let httpReplyCode = ln2[1];
    let bytes = ln2[2];

    //Parse data to object and push it into array
    var newObj = new ObjLine(host, date, request, httpReplyCode, bytes);
    allRequestsObj.push(newObj);
  }
  

  return allRequestsObj;
}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});