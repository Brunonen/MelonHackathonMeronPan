module.exports.channel = function(token) {
	this.boundScource = "";
	this.evalMethod = "";
	this.token = token;
	this.pullData= function (){
		//Enter your token based Pull Data code here
	}
	
	this.evaluateData = function(){
		var data = this.pullData();
		
		//Enter your Evaluation Code here
	}
	this.outputAttractivity = function(){
		
		return this.evaluateData();
	}
};




