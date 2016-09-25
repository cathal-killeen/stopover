var PORT = process.env.PORT || 3000;
var KEY = 'AIzaSyAgXXOYNvbH7admBjrGUmVu8B4IkHbSMro';

var express = require('express');
var request = require('request-promise');
var app = express();

var reqBodies = [{
  "request": {
    "passengers": {
      "kind": "qpxexpress#passengerCounts",
      "adultCount": 1,
      "childCount": 0,
      "infantInLapCount": 0,
      "infantInSeatCount": 0,
      "seniorCount": 0
    },
    "slice": [
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "ATL",
        "destination": "AMS",
        "date": "2017-02-06",
        "maxStops": 0,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
            ""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      },
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "AMS",
        "destination": "BOM",
        "date": "2017-02-08",
        "maxStops": 0,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
            ""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      },
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "BOM",
        "destination": "ATL",
        "date": "2017-02-16",
        "maxStops": 1,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
            ""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      }
    ],
    "maxPrice": "",
    "saleCountry": "US",
    "ticketingCountry": "US",
    "refundable": false,
    "solutions": 1
  }
},
{
  "request": {
    "passengers": {
      "kind": "qpxexpress#passengerCounts",
      "adultCount": 1,
      "childCount": 0,
      "infantInLapCount": 0,
      "infantInSeatCount": 0,
      "seniorCount": 0
    },
    "slice": [
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "ATL",
        "destination": "AMS",
        "date": "2017-02-06",
        "maxStops": 0,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
         	""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      },
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "AMS",
        "destination": "BOM",
        "date": "2017-02-08",
        "maxStops": 0,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
         	""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      },
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "BOM",
        "destination": "CDG",
        "date": "2017-02-16",
        "maxStops": 1,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
         	""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      },
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "CDG",
        "destination": "ATL",
        "date": "2017-02-16",
        "maxStops": 1,
        "maxConnectionDuration": 600,
        "preferredCabin": "COACH",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "00:01",
          "latestTime": "23:59"
        },
        "permittedCarrier": [
         	""
        ],
        "alliance": "SKYTEAM",
        "prohibitedCarrier": [
          ""
        ]
      }
    ],
    "maxPrice": "",
    "saleCountry": "US",
    "ticketingCountry": "US",
    "refundable": false,
    "solutions": 1
  }
}]

app.use(express.static('www'));

app.get('/api', function (req, res) {
    var flightArr = [];
    sendRes = function(){
        res.status(200).json(flightArr);
    }

    //request 2 - Atlanta-Amsterdam-Mumbai-Atlanta
    var processed = 0;
    reqBodies.forEach(function(reqBody){
        request({
            uri: 'https://www.googleapis.com/qpxExpress/v1/trips/search',
            method: 'POST',
            qs: {
                key: KEY // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            body: reqBody,
            json: true
        }).then(function(response){
            console.log(response);
            flightArr.push(response);
            processed++;
            if(processed == reqBodies.length){
                sendRes();
            }
        }).catch(function(err){
            console.log(err);
        })
    })

    //res.status(200).send(origin + " -> " + destin);
});

app.listen(PORT, function () {
  console.log('Listening on port '+PORT);
});
