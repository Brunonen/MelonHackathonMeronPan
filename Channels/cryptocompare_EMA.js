var http = require('https');
var querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.channel = function(token) {
	this.boundScource = "Crypto Compare";
	this.evalMethod = "SMA";
	this.token = token;
	this.pullData = function(){
		//Enter your token based Pull Data code here
	    
		var dataPoints = [];
		r = new XMLHttpRequest();
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histohour?fsym='+this.token+'&tsym=USD&limit=24', false);
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
		
	}
	
	this.evaluateData = function(){
		var data = this.pullData();
		var SMA = [];
		threshold = 12;
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

		
		threshold = 12;
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
		
	
		highCount = 0;
		
		for(i = threshold; i < EMA.length; i++){
			
			if(EMA[i] > SMA[(i - (threshold))]){
				highCount++;
			}
			
		}
		
		return highCount / (EMA.length - (threshold));
	}
	
	this.outputAttractivity = function(){
		return this.evaluateData();
	}
};





