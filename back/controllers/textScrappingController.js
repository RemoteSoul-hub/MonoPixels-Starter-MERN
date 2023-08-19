const axios = require('axios');
const Place = require('../models/Place'); // Adjust the path as needed

exports.textRequest = async (req, res) => {
  try {
    console.log("Starting text search request...");

    const query = req.body.text;
    const key = "AIzaSyDskfKGhahhb5vaq3ITotS5_7EXnPjOT10";
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;

    console.log(`Fetching data from URL: ${url}`);

    axios.get(url)
      .then(async (response) => {
        const places = response.data.results;
        Promise.resolve(places);      
        console.log(`Received ${places.length} places from Google Maps API.`);

        // Iterate over the results and save each one
        for (const place of places) {
          console.log(`Saving place: ${place.name} (ID: ${place.place_id})`);
          const url_details = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${key}`;
          axios.get(url_details).then(async response => {
          const  place_details = response.data.result;
          const newPlace = new Place({
            name: place.name,
            place_id: place.place_id,
            website: place_details.website

          });
          
          await newPlace.save();
          console.log(`Saved place: ${place.name}`);
        })}

        console.log("Sending results back to client.");
        res.json(places); // Send results back to the client
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error_message) {
          console.error(`Error fetching data from Google Maps API: ${error.response.data.error_message}`);
        } else {
          console.error(`Unexpected error:`, error);
        }
        res.status(500).json({ error: error.message || 'An unexpected error occurred' });
      });
  } catch (error) {
    console.error(`Unexpected error: ${error}`);
    res.status(500).json({ error: error.message });
  }
}
