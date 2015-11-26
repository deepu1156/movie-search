var CronJob = require('cron').CronJob;
var Client = require('node-rest-client').Client;
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');


exports.dailyJob = new CronJob({
	cronTime: '00 55 * * * 1-5',
	onTick: function(){
		console.log('Inside batch job');
		client = new Client();
		client.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1111", function(data, response){
            // parsed response body as js object 
            //console.log(data);
            var results = data.results;
            results.forEach(function(item,index,array){
            	console.log('Position: ' + index + ' Object: ' + item.title);
            	var movie = new Movie(results[index]);
            	movie.save(function(err,movie){
  					if(err){
  						console.log('Error in saving' + err);
  					}
  					else {
  						console.log('Movie name saved ' + movie.title);
  					}
  				});
            });
            // raw response 
            //console.log(response);
        });
        client.on('error',function(err){
    		console.error('Something went wrong on the client', err);
		});
	},
	start: true,
	timeZone: 'America/New_York'
});
