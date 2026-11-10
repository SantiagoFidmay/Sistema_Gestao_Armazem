const conn = require('./db/conn')
const {Carga, Entrega, Motorista, Funcionario} = require('./models/rel')

async function syncDataBase(){
    try {
        await conn.sync({force: true})
        console.log('Conectando com o banco')
    } catch (err) {
        console.log('Erro ao conectar o banco')

    }finally{
        await conn.close()
        console.log('Encerrando conexão o banco')

    }
}

syncDataBase()