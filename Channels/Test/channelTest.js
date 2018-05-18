function testMethod(attractivity){
	console.log("Method finished");
	console.log(attractivity);
}

var channel = require('../cryptocompare_EMA.js');


console.log(channel.outputAttractivity("MLN"));

