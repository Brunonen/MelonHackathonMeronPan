function testMethod(attractivity){
	console.log("Method finished");
	console.log(attractivity);
}

var EMA = require('../cryptocompare_EMA.js');
var channel_EMA = new EMA.channel("ETH");

var SMA = require('../cryptocompare_SMA.js');
var channel_SMA = new SMA.channel("ETH");

//console.log("SMA: " + channel_SMA.outputAttractivity());

//console.log("EMA: " + channel_EMA.outputAttractivity());

var CCI = require("../cryptocompare_CCI.js");
var channel_CCI = new CCI.channel("ETH");

channel_CCI.outputAttractivity();


