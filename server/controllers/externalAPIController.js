const Currency = require('../models/Currency'); // Import the Currency model

// Controller to get forex data
const getForexData = async (req, res) => {
    try {
        // Fetch currency data from the database
        const currencyData = await Currency.find();
        
        // Send the currency data as JSON response
        res.json(currencyData);
    } catch (error) {
        // Handle errors
        console.log('Error fetching forex data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Controller to get news data (yet to be implemented)
const getNewsData = async (req, res) => {
    try {
        // Fetch news data from the database (not implemented yet)
        const newsData = await News.find();
        
        // Send the news data as JSON response
        res.json(newsData);
    } catch (error) {
        // Handle errors
        console.log('Error fetching news data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Export the controllers
module.exports = { getForexData, getNewsData };
