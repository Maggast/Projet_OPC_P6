require('dotenv').config()
console.log(process.env)

const express = require('express');

const helmet = require('helmet')

const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const path = require('path');

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy :'cross-origin'})) ;

const my_mongodb_key = process.env.MONGODB_KEY

mongoose.connect(`mongodb+srv://${my_mongodb_key}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces',sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
    
module.exports = app;