const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
require('dotenv').config();
const cors=require('cors');
const route = require('./routes')
const db = require('./config/db');
const app = express();
const port = 4000;


app.use(cors({origin:true,credentials: true}));
// Connect to DB
db.connect();

// middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Routes init
route(app);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})