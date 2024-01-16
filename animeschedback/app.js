// app.js
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');

// Function to fetch anime data based on the anime name
async function getAnimeData(animename) {
    try {
      // Make a GET request to the AnimeSchedule API
      const response = await axios.get(`https://animeschedule.net/api/v3/anime?q=${animename}`);
  
      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle errors, e.g., log them or throw an exception
      console.error('Error fetching anime data:', error.message);
      throw error;
    }
  }

  // Function to fetch anime data based on the anime name
async function getPerticularAnimeData(route) {
  try {
    // Make a GET request to the AnimeSchedule API
    const response = await axios.get(`https://animeschedule.net/api/v3/anime/${route}`);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors, e.g., log them or throw an exception
    console.error('Error fetching perticular anime data for -',route," error- ", error.message);
    throw error;
  }
}

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/anime', async (req, res) => {
    const animeName = req.query.q;
    console.log("INSIDE API CALL");
    try {
      const animeData = await getAnimeData(animeName);
      //console.log("DATA ",animeData);
      res.json(animeData);
    } catch (error) {
      console.error('Error fetching anime data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/api/route", async (req, res) => {
    console.log("INSIDE API ROUTE CALL req- ",req.query);
    let route = req.query.route;
    let routes = JSON.parse(route);
    console.log("INSIDE API ROUTE CALL- ",routes);
    let data = [];
    try {
      
        for(const item of routes) {
          const animeData = await getPerticularAnimeData(item);
          //console.log("DATA ",animeData);
          data = [...data, animeData];
        }
      
    } catch (error) {
      console.error("Error fetching anime data:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
    res.send(data);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
