var dateFormat  = require('dateformat');

module.exports.clientes =function(application, req, res) {
	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	clientesModel.getClientes(function(error, result){
		res.render('clientes/clientes', {clientes : result});
	});
	
}

module.exports.cliente =function(application, req, res) {
	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	var id_cliente = req.query;

	clientesModel.getCliente(id_cliente, function(error, result){

		var clienteResult = result;

		clienteResult[0].data_ingresso = dateFormat(clienteResult[0].data_ingresso,"dd/mm/yyyy");

		res.render('clientes/cliente', {cliente : clienteResult});
	});	
}

module.exports.cad_cliente = function(application, req, res){
	res.render("clientes/cad_cliente", {validacao :{}, cliente : {}});
}

module.exports.form_editar_cliente = function(application, req, res) {
	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	var id_cliente = req.query;

	clientesModel.getCliente(id_cliente, function(error, result){

		var clienteResult = result;

		//clienteResult[0].data_ingresso = dateFormat(clienteResult[0].data_ingresso,"dd/mm/yyyy");

		console.log(result);

		res.render("clientes/form_editar_cliente", {validacao : {}, cliente: clienteResult });
	});		
}

module.exports.cliente_salvar = function(application, req, res) {
	var cliente = req.body;

		req.assert('nome_cliente','Nome do cliente é obrigatorio').notEmpty();
		
		req.assert('data_ingresso','Data da primeira compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

		var erros = req.validationErrors();

		if(erros){
			res.render("clientes/cad_cliente", {validacao : erros, cliente : cliente});
			return;
		}

		var connection = application.config.dbConnection();

		var clientesModel = new application.app.models.ClientesDAO(connection);

		clientesModel.salvarCliente(cliente, function(error, result){
			res.redirect('/clientes');
		});
}

module.exports.editarCliente = function(application, req, res) {
	var cliente = req.body;

	console.log(cliente);

	req.assert('nome_cliente','Nome do cliente é obrigatorio').notEmpty();
		
	req.assert('data_ingresso','Data da primeira compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});

	var erros = req.validationErrors();

	if(erros){
			res.render("clientes/form_editar_cliente", {validacao : {}, cliente: cliente });
			return;
	}

	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	clientesModel.editarCliente(cliente, function(error, result){
		res.redirect('/clientes');
	});
}

module.exports.deleteCliente = function(application, req, res) {
	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	var id_cliente = req.query;

	console.log(id_cliente);

	clientesModel.deleteCliente(id_cliente, function(error, result){
		res.redirect('/clientes');
	});	
}