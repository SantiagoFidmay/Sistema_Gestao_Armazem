// cadastrar e editar

const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('Produto',{
    codProduto : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idFornecedor: {
        type:DataTypes.INTEGER,
        references: {
            model: 'fornecedores',
            key: 'codFornecedor'
        },
        allowNull: false
    }
},{
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto
