const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");
const readline = require("readline");
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Adress to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//1. Show list of found places
geocode.geocodeAddressInfo(argv.address, (errorMessage, results) => {
  if (errorMessage) console.log(errorMessage);
  else {
    console.log(JSON.stringify(results, undefined, 2));
    //2. Get gecode adress latitude and longitude
    geocode.geocodeAddress(argv.address, (errorMessage, results) => {
      if (errorMessage) console.log(errorMessage);
      else {
        coordination = results;
        //console.log(JSON.stringify(results, undefined, 2));

        rl.question("Choose one of places. ", answer => {
          if (answer <= results.length) {
            var userCoordination = results[answer - 1];

            //3. Get weather info of choosen place
            weather.getWeather(userCoordination, (errorMessage, results) => {
              if (errorMessage) console.log(errorMessage);
              else {
                console.log();
                console.log(JSON.stringify(results, undefined, 2));
              }
            });
          } else console.log("Wrong number!");
          rl.close();
        });
      }
    });

    /*
   
    */
  }
});
