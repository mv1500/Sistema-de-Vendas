var dateFormat  = require('dateformat');

module.exports.produtos =function(application, req, res) {

	var msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	var connection = application.config.dbConnection();

	var produtosModel = new application.app.models.ProdutosDAO(connection);

	produtosModel.getProdutos(function(error, result){
		res.render('produtos/produtos', {produtos : result, msg : msg});
	});
	
}

module.exports.produto =function(application, req, res) {
	var connection = application.config.dbConnection();

	var produtosModel = new application.app.models.ProdutosDAO(connection);

	var id_produto = req.query;

	produtosModel.getProduto(id_produto, function(error, result){

		var produtoResult = result;

		produtoResult[0].inicio_venda = dateFormat(produtoResult[0].inicio_venda,"dd/mm/yyyy");

		console.log(produtoResult);

		res.render('produtos/produto', {produto : produtoResult});
	});	
}

module.exports.cad_produto = function(application, req, res){
	res.render("produtos/cad_produto", {validacao :{}, produto : {}});
}

module.exports.produto_salvar = function(application, req, res) {
	var produto = req.body;

		req.assert('nome_produto','Nome do produto é obrigatorio').notEmpty();
		
		req.assert('inicio_venda','Inicio da venda é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

		var erros = req.validationErrors();

		if(erros){
			res.render("produtos/cad_produto", {validacao : erros, produto : produto});
			return;
		}

		var connection = application.config.dbConnection();

		var produtosModel = new application.app.models.ProdutosDAO(connection);

		produtosModel.salvarProduto(produto, function(error, result){
			res.redirect('/produtos?msg=1');
		});
}

module.exports.form_editar_produto = function(application, req, res) {
	var connection = application.config.dbConnection();

	var produtosModel = new application.app.models.ProdutosDAO(connection);

	var id_produto = req.query;

	produtosModel.getProduto(id_produto, function(error, result){

		var produtoResult = result;

		//clienteResult[0].data_ingresso = dateFormat(clienteResult[0].data_ingresso,"dd/mm/yyyy");

		console.log(result);

		res.render("produtos/form_editar_produto", {validacao : {}, produto: produtoResult });
	});		
}

module.exports.editarProduto = function(application, req, res) {
	var produto = req.body;

	console.log(produto);

	req.assert('nome_produto','Nome do produto é obrigatorio').notEmpty();
		
	req.assert('inicio_venda','Inicio da venda é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

	var erros = req.validationErrors();

	if(erros){
			res.render("produtos/form_editar_produto", {validacao : {}, produto: produto });
			return;
	}

	var connection = application.config.dbConnection();

	var produtosModel = new application.app.models.ProdutosDAO(connection);

	produtosModel.editarProduto(produto, function(error, result){

		console.log(error);
		res.redirect('/produtos');
	});
}

module.exports.deleteProduto = function(application, req, res) {
	var connection = application.config.dbConnection();

	var produtosModel = new application.app.models.ProdutosDAO(connection);

	var id_produto = req.query;

	console.log(id_produto);

	produtosModel.deleteProduto(id_produto, function(error, result){
		res.redirect('/produtos');
	});	
}