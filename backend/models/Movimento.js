// listagem 


const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('Movimento',{
    codMovimento : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idProduto: {
        type:DataTypes.INTEGER,
        references: {
            model: 'produtos',
            key: 'codProduto'
        },
        allowNull: false
    }
},{
    tableName: 'movimentos',
    timestamps: false
})

module.exports = Movimento
