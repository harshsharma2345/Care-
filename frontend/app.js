const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/accounts', { useUnifiedTopology: true });
const bcrypt = require('bcrypt');       
const app = express();
const port = 80;
var bodyParser = require('body-parser');

//schema
var Schema = mongoose.Schema;

var patientschema = new Schema({
  fullname: String,
  email: String,
  password1: String,
  //currentpatients: [{ name:String,currentmedicine:String,disease:String}],
  //curedpatients:[{name: String,currentmedicine:String,disease:String,recoveryrate:String}],

});

app.use(express.urlencoded({ extended: false })); //tells the backend application to store data in req variable of app.post



var patientmodel = mongoose.model('patientmodel', patientschema);
app.post('/', (req, res) => {

  var detail = new patientmodel(req.body);
  const hashedpassword = bcrypt.hash(req.body.password1);
  req.body.password1=hashedpassword;
  detail.save().then(() => {
    res.status(200).sendFile('/Volumes/Data/Care+/frontend/Homepage/loginhome.html');
  }).catch(() => {
    res.status(400).send("Error!");
  })

})

//// For serving static files
app.use(express.static('/Volumes/Data/Care+/frontend/Homepage'));
//endpoints
app.get('/', (req, res) => {

  res.status(200).sendFile('/Volumes/Data/Care+/frontend/Homepage/loginhome.html');
})

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

//for login 





