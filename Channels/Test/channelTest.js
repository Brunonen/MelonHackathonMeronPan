function testMethod(attractivity){
	console.log("Method finished");
	console.log(attractivity);
}

var channel = require('../cryptocompare_SMA.js');


channel.outputAttractivity("ETH", testMethod);
