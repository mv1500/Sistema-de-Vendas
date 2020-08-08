module.exports = function(aplication){ 
	aplication.get('/', function(req, res){
		aplication.app.controllers.home.index(aplication, req, res);
	});
};
