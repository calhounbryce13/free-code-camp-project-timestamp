// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get('/api/:date?', (req, res) => {
  let dateObj;
  if(req.params['date']){
    const rawDate = req.params['date'];
    dateObj = new Date(rawDate);
    let UnixTimestamp;
    let UTCstring;
    if(dateObj != 'Invalid Date'){
      UnixTimestamp = dateObj.getTime();
      UTCstring = dateObj.toUTCString();
      res.status(200).json({"unix":UnixTimestamp, "utc": UTCstring});
    }
    else{
      if(new Date(parseInt(rawDate)) != 'Invalid Date'){
        dateObj = new Date(parseInt(rawDate));
        UnixTimestamp = parseInt(rawDate);
        UTCstring = dateObj.toUTCString();
        res.status(200).json({"unix": UnixTimestamp, "utc": UTCstring});
      }
      else{
        res.status(400).json({error: "Invalid date"});
      }
    }
  }
  else{
    dateObj = new Date();
    UnixTimestamp = dateObj.getTime();
    UTCstring = dateObj.toUTCString();
    res.status(200).json({"unix":UnixTimestamp, "utc": UTCstring});
  }
  return;
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
