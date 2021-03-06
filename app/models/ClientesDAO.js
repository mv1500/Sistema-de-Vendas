function ClientesDAO(connection){
	this._connection = connection;
}

ClientesDAO.prototype.getClientes = function(callback){
		this._connection.query('select id_cliente, nome_cliente from clientes order by nome_cliente', callback);
}

ClientesDAO.prototype.getCliente = function(id_cliente, callback){
	 	this._connection.query('SELECT c.*, COUNT(v.id_venda) produtos_comprados FROM clientes as c INNER JOIN vendas as v ON c.id_cliente = v.id_cliente where c.id_cliente = ' + id_cliente.id_cliente, callback);
}

ClientesDAO.prototype.salvarCliente = function(cliente, callback){
	 	this._connection.query('insert into clientes set ? ', cliente, callback);
}

ClientesDAO.prototype.editarCliente = function(cliente, callback) {
		this._connection.query("update clientes SET nome_cliente = '" +cliente.nome_cliente+ "', numero = '" +cliente.numero+ "', email = '" +cliente.email+ "', instagram = '" +cliente.instagram+ "', data_ingresso = '" +cliente.data_ingresso+ "', outras_informacoes = '" +cliente.outras_informacoes+ "' where id_cliente = " +cliente.id_cliente, callback);
}

ClientesDAO.prototype.deleteCliente = function(id_cliente, callback) {
		this._connection.query('delete from clientes where id_cliente = ' + id_cliente.id_cliente, callback);
}


module.exports = function(){
	 return ClientesDAO;
}