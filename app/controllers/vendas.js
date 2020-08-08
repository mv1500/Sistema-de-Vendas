var dateFormat  = require('dateformat');

module.exports.vendas =function(application, req, res) {
	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	vendasModel.getVendas(function(error, result){
		var vendasResult = result;

		console.log(vendasResult);

		vendasResult.forEach(element => { 
		  element.data_compra = dateFormat(element.data_compra,"dd/mm/yyyy");
		}); 

		res.render('vendas/vendas', {vendas : vendasResult});
	});	
}

module.exports.venda = function(application, req, res) {
	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	var id_venda = req.query;

	vendasModel.getVenda(id_venda, function(error, result){

		var vendaResult = result;

		vendaResult[0].data_compra = dateFormat(vendaResult[0].data_compra,"dd/mm/yyyy");
		
		res.render('vendas/venda', {venda : vendaResult});
	});		

}


module.exports.cad_venda = function(application, req, res){
	var vendaForm = {validacao :{}, venda : {}, formDataCliente : {}, formDataProduto: {}};

	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	vendasModel.dataFormClientes(function(error, result) {
		
		vendaForm.formDataCliente = result;

		vendasModel.dataFormProdutos(function(error, result) {

			vendaForm.formDataProduto = result;

			console.log(vendaForm);

			res.render("vendas/cad_venda", {vendaForm : vendaForm} );
		});		
	});

	
}

module.exports.salvarVenda = function(application, req, res) {
	var vendaForm = {validacao :{}, venda : {}, formDataCliente : {}, formDataProduto: {}};

	var venda = req.body;

		req.assert('id_produto','Produto é obrigatorio').notEmpty();
		
		req.assert('id_cliente','Cliente é obrigatorio').notEmpty();

		req.assert('forma_pagamento','Forma de pagamento é obrigatorio').notEmpty();

		req.assert('valor_total','Valor total é obrigatorio').notEmpty();

		req.assert('data_compra','Data Compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

		var erros = req.validationErrors();

		if(erros){

			vendaForm.validacao = erros;

			vendaForm.venda = venda;

			var connection = application.config.dbConnection();

			var vendasModel = new application.app.models.VendasDAO(connection);

			vendasModel.dataFormClientes(function(error, result) {
				vendaForm.formDataCliente = result;

				vendasModel.dataFormProdutos(function(error, result) {

					vendaForm.formDataProduto = result;

					console.log(vendaForm);
					res.render("vendas/cad_venda", {vendaForm : vendaForm} );
				});		
			});
		
			return;
		}

		var connection = application.config.dbConnection();

		var vendasModel = new application.app.models.VendasDAO(connection);

		vendasModel.salvarVenda(venda, function(error, result){
			res.redirect('/vendas');
		});
}

module.exports.form_editar_venda = function(application, req, res) {

	var vendaForm = {validacao :{},formDataCliente : {}, formDataProduto: {}};

	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	var id_venda = req.query;

	vendasModel.getVenda(id_venda, function(error, result){

		var vendaResult = result;

		//clienteResult[0].data_ingresso = dateFormat(clienteResult[0].data_ingresso,"dd/mm/yyyy");

		vendasModel.dataFormClientes(function(error, result) {
		
		vendaForm.formDataCliente = result;

			vendasModel.dataFormProdutos(function(error, result) {

				vendaForm.formDataProduto = result;

				res.render("vendas/form_editar_venda", {validacao : {}, venda: vendaResult, vendaForm : vendaForm });
			});		
		});
	});		
}

module.exports.editarVenda = function(application, req, res) {

	var vendaForm = {validacao :{}, formDataCliente : {}, formDataProduto: {}};

	var venda = req.body;

	req.assert('id_produto','Produto é obrigatorio').notEmpty();
	
	req.assert('id_cliente','Cliente é obrigatorio').notEmpty();

	req.assert('forma_pagamento','Forma de pagamento é obrigatorio').notEmpty();

	req.assert('valor_total','Valor total é obrigatorio').notEmpty();

	req.assert('data_compra','Data Compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

	var erros = req.validationErrors();

	if(erros){

		vendaForm.validacao = erros;

		var connection = application.config.dbConnection();

		var vendasModel = new application.app.models.VendasDAO(connection);

		vendasModel.dataFormClientes(function(error, result) {
			vendaForm.formDataCliente = result;

			vendasModel.dataFormProdutos(function(error, result) {

				vendaForm.formDataProduto = result;

				console.log(vendaForm);
				res.render("vendas/form_editar_venda", {vendaForm : vendaForm, venda : venda} );
			});		
		});

		return;
	}

	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	vendasModel.editarVenda(venda, function(error, result){

		console.log(error);
		res.redirect('/vendas');
	});
}

module.exports.deleteVenda = function(application, req, res) {
	var connection = application.config.dbConnection();

	var vendasModel = new application.app.models.VendasDAO(connection);

	var id_venda = req.query;

	console.log(id_venda);

	vendasModel.deleteVenda(id_venda, function(error, result){
		res.redirect('/vendas');
	});	
}