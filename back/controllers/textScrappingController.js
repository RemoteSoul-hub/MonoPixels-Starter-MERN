const axios = require('axios');
const Place = require('../models/Place');
const puppeteer = require('puppeteer');
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 30;

exports.textRequest = async (req, res) => {
  try {
    console.log("Starting text search request...");

    const query = req.body.text;
    const key = "AIzaSyDskfKGhahhb5vaq3ITotS5_7EXnPjOT10";
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;
    const browser = await puppeteer.launch({ headless: true });

    axios.get(url).then(async (response) => {
      const places = response.data.results;
      console.log(`Received ${places.length} places from Google Maps API.`);

      for (const place of places) {
        console.log(`found place: ${place.name} (ID: ${place.place_id})`);
        const url_details = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${key}`;

        const place_details_response = await axios.get(url_details);
        const place_details = place_details_response.data.result;
        const page = await browser.newPage();

        try {
          await page.goto(`${place_details.website}`, { timeout: 60000 });
          let pagecontent = await page.content();
          let page_email = pagecontent.match(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-](?!domain$)+\.(?!png$)[a-zA-Z0-9-.]{2,})/gi);

          if (page_email ) {
            const newPlace = new Place({
              name: place.name,
              place_id: place.place_id,
              website: place_details.website,
              web_email: page_email[0]
            });

            await newPlace.save();
            console.log(`Saved place: ${place.name}`);
          }
        } catch (error) {
          console.error(`Timeout Error for URL: ${place_details.website}`);
        } finally {
          await page.close();
        }
      }
      await browser.close();
      res.json(places);
    })
    .catch((error) => {
      console.error(`Unexpected error:`, error);
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    console.error(`Unexpected error: ${error}`);
    res.status(500).json({ error: error.message });
  }
}
