const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rohit:<password>@cluster0.gjvme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect("mongodb+srv://nikhildewoolkar:Nikhil123@cluster0.tjcjb.mongodb.net/GameDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database Conection Established!');
});



app.listen(3001, function() {
    console.log('express listening on 3001')
})

//static linking
app.use('/', require('./routes/gameRoute'))