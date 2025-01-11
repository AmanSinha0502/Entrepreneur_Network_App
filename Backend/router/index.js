const express = require('express');
const router = express.Router();

// Example Route
router.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = router;
