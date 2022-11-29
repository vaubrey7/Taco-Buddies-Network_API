const router = require('express').Router();

// Imports all the api routes from api/index.js
const apiRoutes = require('./api');

// Adds the prefix of api to api routes imported from the api directory
router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send('<h1>WARNING WILL ROBINSON!</h1>');
});

module.exports = router;