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
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histohour?fsym='+token+'&tsym=USD&limit=50', false);
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
		threshold = 15;
		currentSum = 0;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			currentSum = currentSum + data[i];
			if(i >= threshold){
				if(offSet > 0){
					currentSum = currentSum - data[offSet];
				}
				
				SMA.push(currentSum / (threshold+1));
				offSet++;
			}
		}
		
		var EMA = [];

		
		threshold = 15;
		multiplier = (2 / (threshold + 1));
		currentSum = 0;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			if(i == 0){
				EMA.push(data[i]);
			}else{
				EMA.push((data[i] - EMA[i-1]) * multiplier + EMA[i-1]);
			}
			
		}
		
		console.log(SMA.length);
		console.log(EMA.length);
		
		
	
		highCount = 0;
		
		for(i = threshold; i < SMA.length; i++){
			
			if(EMA[i] > SMA[(i - (threshold))]){
				highCount++;
				console.log("EMA higher");
			}else{
				console.log("EMA lower");
			}
			
		}
		
		return highCount / (EMA.length - (threshold));
		//Enter your Evaluation Code here
	},
	
	outputAttractivity: function outputAttractiveness(callToken){
		token = callToken;
		return this.evaluateData();
	}
};





