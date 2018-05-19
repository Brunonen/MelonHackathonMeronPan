process.chdir(__dirname);

var express = require("express");
var nconf = require('nconf');
var shelljs = require('shelljs');
var requireDir = require("./requireDir");
var channels = requireDir(__dirname  + "/Channels", null);

function checkCryptoCurrency(shortcode){
    var promiseList = []

    for(var element in channels) {
        var channel = new channels[element].channel(shortcode);
        promiseList.push(channel.outputAttractivity());

    }
    //return Promise.all(promiseList);
    return promiseList;
    /*

    Promise.all(promiseList).then(
        callback
    ).catch(function(values) {
        console.log("shit" + values);
    })*/
}



var app = express();

// read static configuration
var config = new nconf.Provider();
config.use('file', { file: 'config/config.json' });
config.load();

var buildingName = config.get('buildingName');
var typeName = config.get('type');

// configure view engine to render EJS templates.
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/channels',
    function (req, res) {
    var temp = [];
    for(var element in channels) {
        temp.push(element);
    }

    res.send(JSON.stringify(temp));
    }
);

//allows access to ressources in the 'public' folder like images
app.use(express.static('public'));

// define routes.
app.get('/',
    function (req, res) {
        res.render('index', { type: "Konsument", building: "Testgebäude" });
    }
);

app.post('/startbot',
    function (req, res) {
        function callback(result,error){
            res.send(JSON.stringify(result));
        }
        var allCoinsPromises = [];
        //TODO Make this dynamic
        allCoinsPromises.push(checkCryptoCurrency("ETH"));
        allCoinsPromises.push(checkCryptoCurrency("MLN"));
        allCoinsPromises.push(checkCryptoCurrency("BTC"));
        Promise.all(allCoinsPromises).then(callback)
        .catch(function(values) {
            console.log("shit" + values);
        });

        checkCryptoCurrency("ETH");

        
    }
);




app.get('/auctionhouse',
    function (req, res) {
        var auctionHouseAbi = blockchain.getAbi(blockchain.auctionHouseABI);
        var auctionHouseAddress = blockchain.getContractAddress(blockchain.auctionHouseABI);
        console.log("AuctionHouseAddress: " + auctionHouseAddress);
        auctionHouseAddress = JSON.stringify(auctionHouseAddress);
        console.log("stringify "+ auctionHouseAddress);
        res.render('auctionhouse', { building: buildingName, contractAddress: auctionHouseAddress, abi: auctionHouseAbi });
    }
);




//TODO Change to post / Update
app.get("/blockchain/generatechf/:id", function (req, res) {
    var callback = function (error, result) {
        /* This data stack 1  */
        console.log(result);
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    }

    //TODO flexible amount
    blockchain.generateCHFToken(req.params.id, 1, callback);

});


app.use("*",
    function (req, res) {
        res.render('404');
    }
);

app.listen(3000, function () {
    console.log("Live at Port 3000");
});



