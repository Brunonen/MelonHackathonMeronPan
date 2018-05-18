var http = require('https');
var querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.channel = function(token){
	this.boundScource = "Crypto Compare";
	this.evalMethod = "SMA";
	this.token = token;
	this.pullData = function pullDataFromSource(){
		//Enter your token based Pull Data code here
	    
		var dataPoints = [];
		r = new XMLHttpRequest();
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histohour?fsym='+this.token+'&tsym=USD&limit=50', false);
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
	
	this.evaluateData = function evaluatePullData(){
		var data = this.pullData();
		var SMA_High = [];
		threshold_High = 15;
		currentSum = 0;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			currentSum = currentSum + data[i];
			if(i >= threshold_High){
				if(offSet > 0){
					currentSum = currentSum - data[offSet];
				}
				
				SMA_High.push(currentSum / (threshold_High+1));
				offSet++;
			}
		}
		
		var SMA_Low = [];
		
		threshold_Low = 5;
		currentSum = 0;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			currentSum = currentSum + data[i];
			if(i >= threshold_Low){
				if(offSet > 0){
					currentSum = currentSum - data[offSet];
				}
				
				SMA_Low.push(currentSum / (threshold_Low+1));
				offSet++;
			}
		}
		
	
		highCount = 0;
		
		for(i = 0; i < SMA_Low.length; i++){
			if(i >= (threshold_High - threshold_Low)){
				if(SMA_Low[i] > SMA_High[(i - (threshold_High-threshold_Low))]){
					highCount++;
				}
			}
		}
		
		return highCount / (SMA_Low.length - (threshold_High - threshold_Low));
		//Enter your Evaluation Code here
	},
	
	this.outputAttractivity =  function outputAttractiveness(){
		//token = callToken;
		return this.evaluateData();
	}
};





