const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('module-alias/register');
const routes = require('./src/routes');
const bodyParser = require('body-parser');

app.use('/src/image', express.static(path.join(__dirname, 'src', 'image')));
app.use('/src/avatarprofiles', express.static(path.join(__dirname, 'src', 'avatarprofiles')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
