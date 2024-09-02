const express = require('express');
const { fetchContributions } = require('./contributionController');

const router = express.Router();

// Define the route for fetching contributions
router.get('/', fetchContributions);

module.exports = router;
