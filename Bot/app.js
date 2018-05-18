process.chdir(__dirname);

var express = require("express");
var nconf = require('nconf');
var shelljs = require('shelljs');
var requireDir = require("./requireDir");
var channels = requireDir(__dirname  + "/Channels", null);


for(var element in channels) {
    var channel = new channels[element].channel(1)

    console.log(channel.outputAttractivity());
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

// define routes.
app.get('/',
    function (req, res) {

       
        

        
        res.render('index', { type: "Konsument", building: "Testgebäude" });
    }
);

app.get('/about',
    function (req, res) {
        res.render('about', { building: buildingName });
    }
);

app.get('/settings',
    function (req, res) {
        res.render('settings', { building: buildingName });
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

app.get('/reboot',
    function (req, res) {
        shelljs.exec('sudo reboot');
    }
);

app.get('/shutdown',
    function (req, res) {
        shelljs.exec('sudo shutdown -h now');
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






app.get("/blockchain/auctionhouse/reservetoken", function (req, res) {
    var callback = function (error, result) {
        /* This data stack 1  */
        console.log(result);
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    }
    blockchain.reserveToken(buildingName,callback);

});

app.get("/blockchain/auctionhouse/buytoken/:id", function (req, res) {
    var callback = function (error, result) {
        /* This data stack 1  */
        console.log(result);
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    }

    blockchain.buySunnyToken(req.params.id, callback);

});



app.use("*",
    function (req, res) {
        res.render('404');
    }
);

app.listen(3000, function () {
    console.log("Live at Port 3000");
});



