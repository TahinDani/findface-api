const express = require('express');
const bodyParser = require('body-parser'); // Parsing request body
const bcrypt = require('bcrypt-nodejs'); // Hashing password
const cors = require('cors'); // Cross-origin resource sharing
const knex = require('knex'); // SQL query builder

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const port = process.env.PORT || 3000;

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

// Middleware: all request go trough this first
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send('HOME') });
app.post('/signin', signin.handleSignin(db, bcrypt)); // The advanced way
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/image/predict', (req, res) => { image.predict(req, res) });

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});