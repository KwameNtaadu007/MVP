const Currency = require('../models/Currency');

const getForexData = async (req, res) => {
    try {
      const users = await Currency.find();
      res.json(users);
    } catch (error) {
      console.log('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getNewsData = async (req, res) => {
    try {
      const users = await Currency.find();
      res.json(users);
    } catch (error) {
      console.log('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


module.exports={getForexData,getNewsData}
