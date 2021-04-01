require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes of our app
const weatherRouter = require('./routes/weatherRouter');
app.use('/'+ process.env.APP_VERSION, weatherRouter);

//listen port
app.listen(process.env.NODE_PORT, () => {
    console.log('App listening on port '+ process.env.NODE_PORT+ '!');
});
