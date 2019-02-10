const request = require("request");

var geocodeAddressInfo = (arg, callback) => {
  var encodedAdress = encodeURIComponent(arg);
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=XIxJKxpTAiDBujA6xvsT68MqEVQQsEHd&location=?${encodedAdress}`,
      json: true
    },
    (error, respone, body) => {
      if (error) callback("Unable to coonect to Localization servers.");
      else {
        //console.log(JSON.stringify(body, undefined, 2)); // TA 2 TO SPACJE ILE CHCEMY, A RACZEJ ENETRY ALE NWM
        //console.log(encodedAdress);

        if (body == undefined || body.results[0].locations[0].adminArea5 === "")
          callback("Location not found!");
        else {
          var ArrayOfResults = [];

          ArrayOfResults[0] =
            "--------FOUND " +
            body.results[0].locations.length +
            " PLACES----------";

          var i = 0;
          var j = 1;

          body.results[0].locations.forEach(element => {
            ArrayOfResults[++i] = j;
            ArrayOfResults[++i] = element.adminArea5;
            ArrayOfResults[++i] = element.adminArea1;
            ArrayOfResults[++i] = element.adminArea5Type;
            ArrayOfResults[++i] = `Latitude: ${element.latLng.lat}`;
            ArrayOfResults[++i] = `Longitude: ${element.latLng.lng}`;
            ArrayOfResults[++i] =
              "------------------------------------------------------";
            j++;
          });

          callback(undefined, ArrayOfResults);
        }
        //console.log(JSON.stringify(body, undefined, 2));
      }
    }
  );
};

var geocodeAddress = (arg, callback) => {
  var encodedAdress = encodeURIComponent(arg);
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=XIxJKxpTAiDBujA6xvsT68MqEVQQsEHd&location=?${encodedAdress}`,
      json: true
    },
    (error, respone, body) => {
      if (error) callback("Unable to coonect to Localization servers.");
      else {
        //console.log(JSON.stringify(body, undefined, 2)); // TA 2 TO SPACJE ILE CHCEMY, A RACZEJ ENETRY ALE NWM
        //console.log(encodedAdress);

        if (body == undefined || body.results[0].locations[0].adminArea5 === "")
          callback("Location not found!");
        else {
          var ArrayOfResults = [];
          var i = 0;
          body.results[0].locations.forEach(element => {
            ArrayOfResults[i] = {
              latitude: element.latLng.lat,
              longitude: element.latLng.lng
            };
            i++;
          });

          callback(undefined, ArrayOfResults);
        }
        //console.log(JSON.stringify(body, undefined, 2));
      }
    }
  );
};

module.exports = {
  geocodeAddressInfo,
  geocodeAddress
};
