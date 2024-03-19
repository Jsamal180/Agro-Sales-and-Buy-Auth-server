const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/passport_jwtConfig');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/body', (req, res) => {
    a = req.body.a;
    console.log(a);
    return res.json({
        "message" : "successful"
    });
})

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`ERROR LISTENING ON PORT: ${port}`);
    }
    else{
        console.log(`App is listening on PORT: ${port}`);
    }
})