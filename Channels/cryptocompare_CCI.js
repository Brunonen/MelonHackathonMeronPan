var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.channel = function(token) {
	this.boundScource = "";
	this.evalMethod = "";
	this.token = token;
	this.pullData= function (){
		//Enter your token based Pull Data code here
		var dataPoints = [];
		r = new XMLHttpRequest();
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histoday?fsym='+this.token+'&tsym=USD&limit=40', false);
		r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		r.onload  = function() {
		   var jsonResponse = r.responseText;
		   // do something with jsonResponse
		   jsonObject = JSON.parse(jsonResponse);
		
		   for(index in jsonObject["Data"]){
			   dataPoints.push(jsonObject["Data"][index]);
		   }
		   
		};
		r.send();
		return dataPoints;
	}
	
	this.evaluateData = function(){
		var data = this.pullData();
		
		typicalPrizes = [];
		
		for(i = 0; i < data.length; i++){
			typicalPrizes.push((data[i]["close"] + data[i]["high"] + data[i]["low"]) / 3);
		}
		
		CCI = [];
		meanDiviation = 0;
		currentSum = 0;
		threshold = 20;
		offSet = 0;
		for(i = 0; i < data.length; i++){
			
			currentSum = currentSum + typicalPrizes[i];
			console.log(typicalPrizes[i]);

			if(i >= threshold){
				if(offSet > 0){
					currentSum = currentSum - (typicalPrizes[offSet]);
				}
				
				offSet++;
				SMAToday = currentSum / (threshold + 1);

				diviationSum = 0;
				
				for(n = offSet; n < (offSet + threshold); n ++){
					diviationSum = diviationSum + Math.abs(SMAToday - typicalPrizes[n]);
					
				}

				meanDiviation = diviationSum / (threshold - 1);
				//console.log(meanDiviation);
	
				CCI.push((typicalPrizes[i] - SMAToday) / (0.015 * meanDiviation));
				
			}
			
		}
		console.log(CCI);
	
		
		
		//Enter your Evaluation Code here
	}
	this.outputAttractivity = function(){
		
		return this.evaluateData();
	}
};




