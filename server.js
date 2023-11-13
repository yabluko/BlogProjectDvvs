require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose =require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const createPath =require('./helpers/create-path');

 

app.set('view engine', 'ejs');

const PORT = process.env.PORT;   

const db =  process.env.DB_URL;

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log(err))

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.urlencoded({extended : false})); 

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});