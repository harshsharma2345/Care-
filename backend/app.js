require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const port = 8080;
const users = []
app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({ extended: false }));
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//// For serving static files
app.use(express.static('/Volumes/Data/Care+/frontend/Homepage'));
app.use(express.static('/Volumes/Data/Care+/frontend/mainpage'));
//endpoints
app.get('/', (req, res) => {

  let accessToken = req.cookies.jwt

  //if there is no token stored in cookies, the request is unauthorized
  if (!accessToken){
      return res.status(403).sendFile("/Volumes/Data/Care+/frontend/Homepage/loginhome.html")
  }
  
  let payload
  try{
      //use the jwt.verify method to verify the access token
      //throws an error if the token has expired or has a invalid signature
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      console.log(payload);
      if(payload != null){
        res.status(200).sendFile('/Volumes/Data/Care+/frontend/mainpage/mainpage.html');
      }
      
      else{
        res.status(200).sendFile('/Volumes/Data/Care+/frontend/Homepage/loginhome.html');
      }  
  }
  catch(e){
      //if an error occured return request unauthorized error
      return res.status(401).send("You are Unauthorized for this request")
  }
  
})
app.get('/logout', (req, res) => {
  res.status(200).sendFile('/Volumes/Data/Care+/frontend/Homepage/loginhome.html');
})

app.post('/signup', async (req, res) => {

  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { fullname: req.body.fullname, email: req.body.email, password: hashedPassword };
      dbo.collection("customers").insertOne(myobj, function (err, res) {

        if (err) throw err;
        console.log("New User Registered");
      });
    });

    res.status(201).send("Success")


  } catch {
    res.status(500).send("Some error occoured!")
  }
})

app.post('/login', async (req, res) => {

  
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({ email: req.body.email }, function (err, result) {
      if (err) throw err;
      try {
        var found = bcrypt.compare(req.body.password, result.password);
        if (found) {
          const user = {
            username: result.email,
            password: req.body.password,
            id: result._id,
          }
      
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          
          
          res.cookie("jwt", token)

          res.sendFile('/Volumes/Data/Care+/frontend/mainpage/mainpage.html')
        } else {
          res.send('Invalid Username and password')
        }
      }
      catch {
        res.status(500).send("Page not found")
      }

      db.close();
    });
  });

})


app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

