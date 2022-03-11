const express = require('express')
const app = express();

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();


// DATABASE CONNECTION
const mongoose = require('mongoose');
const database_path = process.env.MONGO_URL;

mongoose.connect(database_path, { useNewUrlParser: true })
.then(() => { console.log('Connected with database')})
.catch((err) => { 
    console.log('Error from connection database', err);
    process.exit(1)
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/items', require('./routes/items_route'));
app.use('/one_item', require('./routes/one_item_route'));
app.use('/bill', require('./routes/bill_route'));
app.use('/bill_one', require('./routes/bill_one_route'));

app.use('/count_bills', require('./routes/count_bill'));

// app.use('/addsubcategory', addSubCategory);
// app.use('/login', userLogin);
// app.use('/signup', signup);
// app.use('/favoriteitem', favoritItem);

app.listen(5000, () => console.log('Server is listening on port 5000.'))