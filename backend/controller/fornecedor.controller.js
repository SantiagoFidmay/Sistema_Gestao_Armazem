const Fornecedor = require('../models/Fornecedor')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cpf || !valores.email || !valores.telefone){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {
        
        const cpfCriptografado = cryptoJs.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

        await Fornecedor.create({
            nome: valores.nome,
            email: valores.email,
            cpf: cpfCriptografado,
            telefone: valores.telefone
        })

        return res.status(201).json({message: "Dados cadastrados com sucesso!"})


    } catch (err){
        console.error('Erro ao cadastrar o fornecedor!',err)
        return res.status(500).json({message: 'Erro ao cadastrar o fornecedor!'})
    }
}


const consultarID = async(req,res)=>{
    const id = req.params.id

    try {
        const fornecedor = await Fornecedor.findByPk(id)
        if(!fornecedor){
            return res.status(404).json({message: "Fornecedor não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(fornecedor.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: cpfDescriptografado,
            email: fornecedor.email,
            telefone: fornecedor.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar o fornecedor!',err)
        return res.status(500).json({message: 'Erro ao consultar o fornecedor!'})
    }
}



const consultarNome = async(req,res)=>{
    const nome = req.params.nome

    try {
        const fornecedor = await Fornecedor.findOne({where: {nome: nome}})
        if(!fornecedor){
            return res.status(404).json({message: "Fornecedor não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(fornecedor.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: cpfDescriptografado,
            email: fornecedor.email,
            telefone: fornecedor.telefone
        })


    } catch (err) {
        console.error('Erro ao consultar o fornecedor!',err)
        return res.status(500).json({message: 'Erro ao consultar o fornecedor!'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try {
       const fornecedor = await Fornecedor.findByPk(id)
       if(!fornecedor){
            return res.status(404).json({message: "Fornecedor não encontrado."})
       }

       await Fornecedor.destroy({where: {codFuncionario: id}})
       return res.status(200).json({message: "Dados apagados com sucesso!"})
        

    } catch (err) {
        console.error('Erro ao apagar o fornecedor!',err)
        return res.status(500).json({message: 'Erro ao apagar o fornecedor!'})
    }
}


const listar = async(req,res)=>{
    try {
        const fornecedor = await Fornecedor.findAll()

        if(!fornecedor){
            return res.status(404).json({message: "Motorista não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(fornecedor.cpf, CHAVE_SECRETA)

        const cpfCriptografado = bytes.toString(cryptoJs.enc.Utf8)

        const dados = {
            nome: fornecedor.nome,
            cpf: cpfCriptografado,
            email: fornecedor.email,
            telefone: fornecedor.telefone
        }

        return res.status(200).json(dados)

    } catch (err) {
        console.error('Erro ao consultar o fornecedor',err)
        return res.status(500).json({message: 'Erro ao consultar o fornecedor' })
    }
}

// const atualizar = async(req,res)=>{
//     const id = req.params.id
//     const valores = req.body

//     try {
//         const fornecedor = await Fornecedor.findByPk(id)
//         if(!fornecedor){
//             return res.status(404).json({message: "Motorista não encontrado!"})
//         }

//         const 



//     } catch (err) {
//         console.error('Erro ao atualizar o fornecedor')
//         return res.status(500).json({message: 'Erro ao atualizar o fornecedor' })  
//     }
// }

module.exports = {cadastrar, consultarID, consultarNome, apagar, listar}