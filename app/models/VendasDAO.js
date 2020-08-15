function VendasDAO(connection){
	this._connection = connection;
}

VendasDAO.prototype.getVendas = function(callback) {
	this._connection.query('SELECT v.*, p.nome_produto, c.nome_cliente FROM vendas AS v INNER JOIN produtos as p on (v.id_produto = p.id_produto) INNER join clientes as c ON (v.id_cliente = c.id_cliente) order by data_compra desc', callback);
}

VendasDAO.prototype.getVenda = function(id_venda, callback) {
	this._connection.query('SELECT v.*, p.nome_produto, p.valor, c.nome_cliente FROM vendas AS v INNER JOIN produtos as p on (v.id_produto = p.id_produto) INNER join clientes as c ON (v.id_cliente = c.id_cliente) where id_venda = ' + id_venda.id_venda, callback);
}

VendasDAO.prototype.historicoCompras = function(id_cliente, callback) {
	this._connection.query('SELECT v.*, p.nome_produto, p.valor, c.nome_cliente FROM vendas AS v INNER JOIN produtos as p on (v.id_produto = p.id_produto) INNER join clientes as c ON (v.id_cliente = c.id_cliente) where v.id_cliente = ' + id_cliente, callback);
}

VendasDAO.prototype.salvarVenda = function(venda, callback){
	 	this._connection.query('insert into vendas set ? ', venda, callback);
}

VendasDAO.prototype.dataFormClientes = function(callback){
	 	this._connection.query('select id_cliente, nome_cliente from clientes order by nome_cliente', callback);
}

VendasDAO.prototype.dataFormProdutos = function(callback){
	 	this._connection.query('select * from produtos order by inicio_venda desc', callback);
}

VendasDAO.prototype.editarVenda = function(venda, callback) {
		this._connection.query("update vendas SET id_cliente = '" +venda.id_cliente+ "', id_produto = '" +venda.id_produto+ "', desconto = '" +venda.desconto+ "', valor_total = '" +venda.valor_total+ "', data_compra = '" +venda.data_compra+ "', forma_pagamento = '" +venda.forma_pagamento+ "' where id_venda = " +venda.id_venda, callback);
}

VendasDAO.prototype.deleteVenda = function(id_venda, callback) {
		this._connection.query('delete from vendas where id_venda = ' + id_venda.id_venda, callback);
}

module.exports = function(){
	 return VendasDAO;
}