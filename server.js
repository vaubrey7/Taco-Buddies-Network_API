// using the routes, express and the db we can now set up our Taco buddie port 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// this is our port set to 3001
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// the console log will tell us if the port is succesfull in running
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});