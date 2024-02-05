const {Router} = require('express');
const router = Router();
const {getForexData,getNewsData} =require('../controllers/externalAPIController');

//fetch forex data saved from external API
router.get('/api/forex', getForexData);


router.get('/api/news', getNewsData);


module.exports =router