const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app =  express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '//index.html'));
    console.log(req);
})

app.listen(3000, function(){
  console.log("Server started on port 3000.")
})
app.get('index.html', function(req, res) {
    res.send("");
});
app.listen(port);

/* 

turn powershell to npm

$env:Path += ";C:\Program Files\nodejs\"

*/