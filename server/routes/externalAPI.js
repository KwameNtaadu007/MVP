const {Router} = require('express');
const router = Router();
const {getForexData,getNewsData} =require('../controllers/externalAPIController');

//fetch forex data saved from external API
router.get('/api/forex', getForexData);

//fetch news
router.get('/api/news', getNewsData);


module.exports =router