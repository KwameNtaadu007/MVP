const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes')
const Currency = require('./models/Currency');

const usersRouter = require('./routes/users');
const externalAPIRouter = require('./routes/externalAPI');

const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config({path:'./.env'});



const app = express();
const port = process.env.PORT || 3300;
const atlasURI = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/mern";


// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());


// Routes
app.use(router)
app.use(usersRouter)
app.use(externalAPIRouter)

// Function to fetch data from the API and save to MongoDB
const fetchDataAndSaveToDB = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Save data to MongoDB
    await Currency.create(data);

    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
  }
};

// Schedule the task to run every 24 hours
cron.schedule('0 0 */24 * * *', () => {
  fetchDataAndSaveToDB(process.env.FOREX_API);
});

// cron.schedule('6 8 * * * *', () => {
//   fetchDataAndSaveToDB();
// });


// Connect to MongoDB
mongoose.connect(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
