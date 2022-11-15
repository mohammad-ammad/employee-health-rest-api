const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const RootRoute = require('./routes/root.route');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))

app.use("/api/v1", RootRoute)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(res => {
    console.log("Connected to database")
    app.listen("8000", ()=>console.log("server is running"));
}).catch(err => console.log(err));