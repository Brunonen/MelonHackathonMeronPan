var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.channel = function(token) {
	this.boundScource = "";
	this.evalMethod = "";
	this.token = token;
	this.pullData= function (){
		//Enter your token based Pull Data code here
		var dataPoints = [];
		r = new XMLHttpRequest();
		
		r.open('POST', 'https://min-api.cryptocompare.com/data/histohour?fsym='+this.token+'&tsym=USD&limit=40', false);
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
		offSet = 0
		
		overPriced = 0;
		underPriced = 0;
		normalPositive = 0;
		normalNegative = 0;
		totalCCI = 0;
		for(i = 0; i < data.length; i++){
			
			currentSum = currentSum + typicalPrizes[i];


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
	
				currentCCI = (typicalPrizes[i] - SMAToday) / (0.015 * meanDiviation)
				CCI.push(currentCCI);
				totalCCI = totalCCI + currentCCI;
				
				if(currentCCI >= 100){
					overPriced ++;
				}else if(currentCCI < 100 && currentCCI >= 0){
					normalPositive++;
				}else if(currentCCI < 0 >= -99){
					normalNegative++;
				}else if(currentCCI <= -100){
					underPriced++;
				}
				
			}
			
		}
		totalCCI = totalCCI / CCI.length;
		
		attractivenss = 0.5;
		attractivenss = attractivenss + ((totalCCI / 100) * 0.5);
		return(attractivenss);
		
		
		//Enter your Evaluation Code here
	}
	this.outputAttractivity = function(){
		
		return this.evaluateData();
	}
};




