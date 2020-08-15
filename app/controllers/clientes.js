var dateFormat  = require('dateformat');

module.exports.clientes =function(application, req, res) {

	var msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	var connection = application.config.dbConnection();

	var clientesModel = new application.app.models.ClientesDAO(connection);

	clientesModel.getClientes(function(error, result){

		res.render('clientes/clientes', {clientes : result, msg : msg});
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

module.exports.historicoCompras =function(application, req, res) {
	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	var id_cliente = req.body;

	console.log(id_cliente);

	vendasModel.historicoCompras(id_cliente.id_cliente, function(error, result){

		console.log(result);

		var historicoResult = result;

		historicoResult.forEach(element => { 
		  element.data_compra = dateFormat(element.data_compra,"dd/mm/yyyy");
		});		

		res.render('clientes/historico_compras', {historico : historicoResult});
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
			console.log(result);
			res.redirect('/clientes?msg=1');
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