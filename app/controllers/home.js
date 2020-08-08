module.exports.index = function(application, req, res) {
	
	//var connection = application.config.dbConnection();
	//var clienteModel = new application.app.models.ClientesDAO(connection);

	//clienteModel.get5UltimasNoticias( function(error, result){
		res.render("home/index");	
	//});	
}