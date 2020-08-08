module.exports = function(application){ 
	
	application.get('/clientes', function(req, res){		
		application.app.controllers.clientes.clientes(application, req, res);		
	});

	application.get('/cliente', function(req, res){		
		application.app.controllers.clientes.cliente(application, req, res);
	});

	application.get('/cad_cliente', function(req, res){
		application.app.controllers.clientes.cad_cliente(application, req, res);
	});

	application.post('/cliente/salvar', function(req, res){
		application.app.controllers.clientes.cliente_salvar(application, req, res);
	});

	application.get('/form_editar_cliente', function(req, res){
		application.app.controllers.clientes.form_editar_cliente(application, req, res);
	});

	application.post('/cliente/editarCliente', function(req, res){
		application.app.controllers.clientes.editarCliente(application, req, res);
	});

	application.get('/deleteCliente', function(req, res){
		application.app.controllers.clientes.deleteCliente(application, req, res);
	});
};

