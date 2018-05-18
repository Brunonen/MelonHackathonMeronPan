module.exports = {
	boundScource : "",
	evalMethod : "",
	token : "",
	pullData: function pullDataFromSource(){
		//Enter your token based Pull Data code here
	},
	
	evaluateData: function evaluatePullData(){
		var data = pullData();
		
		//Enter your Evaluation Code here
	},
	outputAttractivity: function outputAttractiveness(callToken, callback){
		token = callToken;
		callback(evaluateData());
	}
};




