const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const options = {
    url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=15395243f1d9e7946dbdf25eb6252573',
    json: true,
  };

  request(options, (error, {body}) => {
    if (error) {
      callback("Cannot display weather forecast!!", undefined)
    } else if (body.message) {
      callback('Cannot find city', undefined)
    } else {
      callback(undefined, "Current Temprature is " + body.main.temp);
    }
  })
}


module.exports = forecast;
