const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch'); // Import 'node-fetch' for making HTTP requests
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const router = require('./routes/routes');
const usersRouter = require('./routes/users');
const externalAPIRouter = require('./routes/externalAPI');
const Currency = require('./models/Currency');

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3300;
const atlasURI = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/mern';

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(router);
app.use(usersRouter);
app.use(externalAPIRouter);

// Function to fetch data from the API and save to MongoDB
const fetchDataAndSaveToDB = async (url) => {
  try {
    const response = await fetch(url); // Fetch data from the provided URL
    const data = await response.json(); // Parse the response as JSON
    await Currency.create(data); // Save data to MongoDB using Mongoose model
    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
  }
};

// Schedule the task to run every 24 hours
cron.schedule('0 0 */24 * * *', async () => {
  try {
    await fetchDataAndSaveToDB(process.env.FOREX_API); // Call the function to fetch data and save to MongoDB
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

mongoose.connect(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successfully connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
