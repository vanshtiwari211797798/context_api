const express = require('express');
const app = express();
const ConnectDB = require('./DataBase/DataBase');
const router = require('./Router/Router');
const cors = require('cors');
const bodyparser = require('body-parser');


const Origin = {
    Origin:"http://localhost:5173",
    method:"GET PUT POST DELETE",
    Credential:true
}

app.use(bodyparser.json()); 
app.use(cors(Origin));
app.use(express.json());
app.use("/",router);


const PORT = 3000;


ConnectDB().then(() => {
    app.listen((PORT), () => {
        console.log(`App is running on port ${PORT}`);
    })
})
