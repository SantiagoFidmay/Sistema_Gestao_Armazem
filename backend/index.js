
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const produtoController = require('./controller/produto.controller')
const fornecedorController = require('./controller/fornecedor.controller')
const funcionarioController = require('./controller/funcionario.controller')
const movimentoController = require('./controller/movimento.controller')

// ------------ Middleware ------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ----- Rotas Públicas ----

app.post('/funcionario',funcionarioController.cadastrar)
app.post('/login', authController.login)


app.use(authMiddleware)

//---- rotas Privadas ----

app.post('/fornecedor',fornecedorController.cadastrar)
app.get('/fornecedores',fornecedorController.listar)
app.get('/fornecedor/buscarNome/:nome',fornecedorController.consultarNome)
app.get('/fornecedor/:id', fornecedorController.consultarID)
app.delete('/fornecedor/:id',fornecedorController.apagar)

app.post('/produto',produtoController.cadastrar)
app.get('/produtos',produtoController.listar)
app.get('/produto/:id',produtoController.consultarID)

app.post('/movimento',movimentoController.cadastrar)

app.get('/',(req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// --------- Sincronizando o servidor com o banco de dados -----

conn.sync()
    .then(()=>{
        app.listen(PORT,hostname, ()=>{
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao conectar com o banco de dados!',err)

    })
