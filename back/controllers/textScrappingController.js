const {Client} = require("@googlemaps/google-maps-services-js");
const axios = require("axios");

const client = new Client({});

exports.textRequest = async (req, res) => {
  try {
      console.log("I'm within the try textsearch");
      const query = req.body.text;
      const key = "AIzaSyDskfKGhahhb5vaq3ITotS5_7EXnPjOT10";
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;

      axios.get(url)
        .then((response) => {
          console.log(response.data.results);
          res.json(response.data.results); // Send results back to the client if needed
        })
        .catch((error) => {
          console.log(error.response.data.error_message);
          res.status(500).json({ error: error.response.data.error_message }); // Send error message back to the client
        });
  } catch (error) {
      console.error(error); // Log any other error that occurs
      res.status(500).json({ error: error.message });
  }
}