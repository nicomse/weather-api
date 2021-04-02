require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.NODE_PORT || 8080;
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes of our app
const weatherRouter = require('./routes/weatherRouter');
app.use('/'+ process.env.APP_VERSION, weatherRouter);

//listen port
app.listen(port, () => {
    console.log('App listening on port '+ port + '!');
});
module.exports = app;