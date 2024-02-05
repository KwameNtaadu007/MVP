const {Router} = require('express');

const router = Router();

// Route to fetch all users
router.get('/api', (req, res) => res.json('Welcome to insure ghana'));


module.exports = router;