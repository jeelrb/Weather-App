const request = require('request');

const geocode = (address, callback) => {
  const options = {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamVlbHJiMzAiLCJhIjoiY2tmamg5MTVxMTRzeTJxbnZyc2FoNTdseSJ9.94p6TULfdBXTm1NWol9TBw',
    json: true,
  };

  request(options, (error, { body }) => {
    if (error) {
      callback('Unable to access location', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find the city. Search another', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode;
