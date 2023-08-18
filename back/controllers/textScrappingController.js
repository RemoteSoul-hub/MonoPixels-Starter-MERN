const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});

exports.textRequest = async (req, res) => {
    try {
        console.log("im within the try textsearch")
        client.textSearch({
            params: {
              textSearch: req.body,
              key: "AIzaSyDskfKGhahhb5vaq3ITotS5_7EXnPjOT10",
            },
            timeout: 1000, // milliseconds
          })
          .then((r) => {
            console.log(r.data.results[0].textSearch);
          })
          .catch((e) => {
            console.log(e.response.data.error_message);
          });
    } catch (error) {
        console.error(err); // Log any error that occurs
        res.status(500).json({ error: err.message });
    }

}