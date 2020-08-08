module.exports = function(application){ 
	
	application.get('/vendas', function(req, res){		
		application.app.controllers.vendas.vendas(application, req, res);		
	});

	application.get('/venda', function(req, res){		
		application.app.controllers.vendas.venda(application, req, res);
	});

	application.get('/cad_venda', function(req, res){
		application.app.controllers.vendas.cad_venda(application, req, res);
	});

	application.post('/venda/salvar', function(req, res){
		application.app.controllers.vendas.salvarVenda(application, req, res);
	});

	application.get('/form_editar_venda', function(req, res){
		application.app.controllers.vendas.form_editar_venda(application, req, res);
	});

	application.post('/venda/editarVenda', function(req, res){
		application.app.controllers.vendas.editarVenda(application, req, res);
	});

	application.get('/deleteVenda', function(req, res){
		application.app.controllers.vendas.deleteVenda(application, req, res);
	});
};