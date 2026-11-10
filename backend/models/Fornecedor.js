// Crud completo

const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Fornecedor = db.define('fornecedor',{
    codFornecedor : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

},{
    tableName: 'fornecedores',
    timestamps: false
})

module.exports = Fornecedor
