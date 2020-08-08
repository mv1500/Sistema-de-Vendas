function ProdutosDAO(connection){
	this._connection = connection;
}

ProdutosDAO.prototype.getProdutos = function(callback){
		this._connection.query('select * from produtos order by inicio_venda desc', callback);
}

ProdutosDAO.prototype.getProduto = function(id_produto, callback){
	 	this._connection.query('select * from produtos where id_produto = ' + id_produto.id_produto, callback);
}

ProdutosDAO.prototype.salvarProduto = function(produto, callback){
	 	this._connection.query('insert into produtos set ? ', produto, callback);
}

ProdutosDAO.prototype.editarProduto = function(produto, callback) {
		this._connection.query("update produtos SET nome_produto = '" +produto.nome_produto+ "', descricao = '" +produto.descricao+ "', categoria = '" +produto.categoria+ "', valor = '" +produto.valor+ "', inicio_venda = '" +produto.inicio_venda+ "' where id_produto = " +produto.id_produto, callback);
}

ProdutosDAO.prototype.deleteProduto = function(id_produto, callback) {
		this._connection.query('delete from produtos where id_produto = ' + id_produto.id_produto, callback);
}

module.exports = function(){
	 return ProdutosDAO;
}