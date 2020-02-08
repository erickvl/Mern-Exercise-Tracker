const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParse = require('body-parser'); // Not required in latest version of express

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
const OPTS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
// mongoose.connect(URI, OPTS, (err) => {
//     if (err) { return console.log('failed' + err); }
// });

mongoose.connect(URI, OPTS)
    .then( () => console.log('DB Connected') )
    .catch(err => {
        if (err) { return console.log('failed' + err); }
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});