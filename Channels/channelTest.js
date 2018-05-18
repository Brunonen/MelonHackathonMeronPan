function testMethod(attractivity){
	console.log("Method finished");
	console.log(attractivity);
}

var channel = require('./Test/cryptocompare_SMA.js');


console.log(channel.outputAttractivity("BTC"));

