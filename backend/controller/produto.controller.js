const Produto = require('../models/Produto')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.categoria || !valores.quantidade || !valores.codLote || !valores.idFornecedor){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {
        
        const codLoteCriptografado = cryptoJs.AES.encrypt(valores.codLote,CHAVE_SECRETA).toString()

        await Produto.create({
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidade: valores.quantidade,
            codLote: codLoteCriptografado,
            idFornecedor: valores.idFornecedor
        })

        return res.status(201).json({message: "Dados cadastrados com sucesso!"})


    } catch (err){
        console.error('Erro ao cadastrar o funcionario!')
        return res.status(500).json({message: 'Erro ao cadastrar o funcionario!'})
    }
}



const consultarID = async(req,res)=>{
    const id = req.params.id

    try {
        const produto = await Produto.findByPk(id)

        if(!produto){
            return res.status(404).json({message: "Produto não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(produto.codLote,CHAVE_SECRETA)
        const codLoteDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codProduto: produto.codProduto,
            descricao: produto.descricao,
            categoria: produto.categoria,
            quantidade: produto.quantidade,
            codLote: codLoteDescriptografado,
            idFornecedor: produto.idFornecedor
        })

    } catch (err) {
        console.error('Erro ao consultar o produto!',err)
        return res.status(500).json({message: 'Erro ao consultar o produto!'})
    }
}




const consultarNome = async(req,res)=>{
    const nome = req.params.nome

    try {
        const produto = await Produto.findOne({where: {nome: nome}})
        if(!produto){
            return res.status(404).json({message: "Produto não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(produto.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: nome,
            cpf: cpfDescriptografado,
            email: email,
            telefone: telefone
        })


    } catch (err) {
        console.error('Erro ao consultar o produto!')
        return res.status(500).json({message: 'Erro ao consultar o produto!'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try {
       const produto = await Produto.findByPk(id)
       if(!produto){
            return res.status(404).json({message: "produto não encontrado."})
       }

       await Produto.destroy({where: {codFuncionario: id}})
       return res.status(200).json({message: "Dados apagados com sucesso!"})
        

    } catch (err) {
        console.error('Erro ao apagar o produto!')
        return res.status(500).json({message: 'Erro ao apagar o produto!'})
    }
}



const listar = async(req,res)=>{
    try {
        const produtos = await Produto.findAll()

        if(produtos.length === 0){
            return res.status(404).json({message: "Nenhum produto encontrado!"})
        }

        const dados = produtos.map((produto)=>{
            const bytes = cryptoJs.AES.decrypt(produto.codLote, CHAVE_SECRETA)
            const codLoteDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            return {
                codProduto: produto.codProduto,
                descricao: produto.descricao,
                categoria: produto.categoria,
                quantidade: produto.quantidade,
                codLote: codLoteDescriptografado,
                idFornecedor: produto.idFornecedor
            }
        })

        return res.status(200).json(dados)

    } catch (err) {
        console.error('Erro ao listar os produtos!',err)
        return res.status(500).json({message: "Erro ao listar os produtos!"})
    }
}



module.exports = {cadastrar, consultarID, consultarNome, apagar, listar}