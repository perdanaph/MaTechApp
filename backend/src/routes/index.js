const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
const auth = require('./authentication');
const questions = require('./questions');
const home = require('./home');
const tag = require('./tag');
const users = require('./users');
const save = require('./save');
const questioner = require('./questioner');
const GlobalMiddleware = require('../middleware/GlobalMiddleware');

app.use(cors());

// Auth route
app.use('/api/auth', auth);
// Home route
app.use('/api/home', home);
// Tag route
app.use('/api/tag', tag);
app.use('/api/users', users);
app.use('/api/save', save);
app.use('/api/questioner', questioner);

// Middleware global, why "/auth" not use this middleware because it not requires middleware
// app.use(GlobalMiddleware.check);

// Questions route
app.use('/api/questions', questions);

module.exports = app;
