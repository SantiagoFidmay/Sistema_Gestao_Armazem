const Produto = require('./Produto')
const Fornecedor = require('./Fornecedor')
const Movimento = require('./Movimento')
const Funcionario = require('./Funcionario')

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor',
    as: 'produtoFornecedor',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fornecedor,{
    foreignKey: 'idFornecedor',
    as: 'fornecedorProduto',
    allowNull: false
})

Produto.hasMany(Movimento,{
    foreignKey: 'idProduto',
    as: 'movimentacaoProduto',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoMovimentacao',
    allowNull: false
})

module.exports = {Produto, Fornecedor, Movimento, Funcionario}