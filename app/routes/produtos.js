module.exports = function(application){ 
	
	application.get('/produtos', function(req, res){		
		application.app.controllers.produtos.produtos(application, req, res);		
	});

	application.get('/produto', function(req, res){		
		application.app.controllers.produtos.produto(application, req, res);
	});

	application.get('/cad_produto', function(req, res){
		application.app.controllers.produtos.cad_produto(application, req, res);
	});

	application.post('/produto/salvar', function(req, res){
		application.app.controllers.produtos.produto_salvar(application, req, res);
	});

	application.get('/form_editar_produto', function(req, res){
		application.app.controllers.produtos.form_editar_produto(application, req, res);
	});

	application.post('/produto/editarProduto', function(req, res){
		application.app.controllers.produtos.editarProduto(application, req, res);
	});

	application.get('/deleteProduto', function(req, res){
		application.app.controllers.produtos.deleteProduto(application, req, res);
	});
};