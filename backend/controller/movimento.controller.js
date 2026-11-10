const Movimento = require('../models/Movimento')


const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.tipo || !valores.quantidade || !valores.data || !valores.idProduto){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {
        
        await Movimento.create({
            tipo: valores.tipo,
            quantidade: valores.quantidade,
            data: valores.data,
            idProduto: valores.idProduto,
            
        })

        return res.status(201).json({message: "Dados cadastrados com sucesso!"})


    } catch (err){
        console.error('Erro ao cadastrar o funcionario!')
        return res.status(500).json({message: 'Erro ao cadastrar o funcionario!'})
    }
}


module.exports = {cadastrar}