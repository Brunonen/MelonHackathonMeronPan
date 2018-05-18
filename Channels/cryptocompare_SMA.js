var http = require('https');
var querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
	boundScource : "Crypto Compare",
	evalMethod : "SMA",
	token : "",
	pullData: function pullDataFromSource(){
		//Enter your token based Pull Data code here
	    
		var dataPoints = [];
		r = new XMLHttpRequest();
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histohour?fsym='+token+'&tsym=USD&limit=24', false);
		r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		r.onload  = function() {
		   var jsonResponse = r.responseText;
		   // do something with jsonResponse
		   jsonObject = JSON.parse(jsonResponse);
		
		   for(index in jsonObject["Data"]){
			   dataPoints.push(jsonObject["Data"][index]["close"]);
		   }
		   
		};
		r.send();
		return dataPoints;
		
	},
	
	evaluateData: function evaluatePullData(){
		var data = this.pullData();
		var SMA = [];
		currentSum = 0;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			currentSum = currentSum + data[i];
			if(i >= 8){
				if(offSet > 0){
					currentSum = currentSum - data[offSet];
				}
				
				SMA.push(currentSum / 9);
				offSet++;
			}
		}
		
		console.log(SMA);
		
		return data;
		//Enter your Evaluation Code here
	},
	
	outputAttractivity: function outputAttractiveness(callToken){
		token = callToken;
		return this.evaluateData();
	}
};





