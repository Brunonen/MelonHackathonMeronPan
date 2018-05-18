var http = require('https');
var querystring = require('querystring');

module.exports = {
	boundScource : "Crypto Compare",
	evalMethod : "SMA",
	token : "",
	pullData: function pullDataFromSource(){
		//Enter your token based Pull Data code here
	    
		
		var options = {
		  hostname: 'min-api.cryptocompare.com',
		  port: 80,
		  path: '/data/histohour',
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
		  }
		};
		
		var post_data = querystring.stringify({"fsym" : "USD", "tsym" : token, "limit" : "50"});

		
		var post_options = {
			  host: 'min-api.cryptocompare.com',
			  path: '/data/histohour',
			  port: '80',
			  method: 'POST',
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Content-Length': Buffer.byteLength(post_data)
			  }
		  };

		  // Set up the request
		  var post_req = http.request(post_options, function(res) {
			  res.setEncoding('utf8');
			  res.on('data', function (chunk) {
				  console.log('Response: ' + chunk);
			  });
		  });
			/*	
		var req = http.request(options, function(res) {
		  console.log('Status: ' + res.statusCode);
		  console.log('Headers: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (body) {
			console.log('Body: ' + body);
		  });
		});
		*/
		post_req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
		
		// write data to request body
		post_req.write(post_data);
		post_req.end();
		
		
	},
	
	evaluateData: function evaluatePullData(){
		data = this.pullData();
		return data;
		//Enter your Evaluation Code here
	},
	
	outputAttractivity: function outputAttractiveness(callToken, callback){
		token = callToken;
		callback(this.evaluateData());
	}
};





