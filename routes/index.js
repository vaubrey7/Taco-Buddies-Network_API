const router = require('express').Router();

// Importing all the api routes from api/index.js
const apiRoutes = require('./api');

// Add prefix of api to api routes imported from api directory
router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send('<h1>404 ERROR!</h1>');
});

module.exports = router;