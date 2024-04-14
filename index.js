require("dotenv").config();
const express = require('express');
const connectDB = require('./src/db/db');
const router = require('./src/routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(cookieParser());

connectDB();

app.use(router);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})