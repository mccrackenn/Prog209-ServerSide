var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

//app.use(express.static(path.join(__dirname , '/public')));
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
    
});

// about page 
app.get('/activated', function(req, res) {
    res.render('pages/activated', {
        dataArray: app.dataArray
    });
});

// upLoadData page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/uploadData', function(req, res) {
    let player = req.param('player');
    let position = req.param('position');
    let college = req.param('college');
    if(player != null){
        let aPlayer = {
            player: player,
            position: position,
            college: college
        }
    app.dataArray.push(aPlayer);
    }
    res.render('pages/uploadData', { 
        dataArray: app.dataArray
     });
  });
app.get('/playerAlphabetize', function(req, res){
    app.copyArray=JSON.parse(JSON.stringify(app.dataArray));
    //app.copyArray.sort(dynamicSort("player"));
    app.copyArray.sort(function(a,b){
        let playerA=a.player.toUpperCase();
        let playerB=b.player.toUpperCase();
        if(playerA < playerB) {
            return -1;
        }else {
            return 1;
        }

    });
     res.render('pages/playerAlphabetize', {
        dataArray:app.copyArray
    
     });
   
});



// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let error ={
        status: "this is real bad",
        stack: "somebody called somebody who called somebody"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: error
    });
});


// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
