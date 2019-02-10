const request = require("request");

var getWeather = (coordination, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/286f1a48d6cf20c07aedb42da38b2acc/${
        coordination.latitude
      },${coordination.longitude}`,
      json: true
    },
    (error, response, body) => {
      if (error) callback("Getting weather info error");
      else {
        var temp = Math.round((body.currently.temperature - 32) * 0.55);
        callback({
          summary: body.currently.summary,
          temperature: temp,
          humidity: body.currently.humidity,
          pressure: body.currently.pressure
        });
      }
    }
  );
};

module.exports = {
  getWeather
};
