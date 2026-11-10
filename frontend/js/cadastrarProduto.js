const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}


const resposta = document.getElementById('resposta')
const btn_cadProduto = document.getElementById('btn_cadProduto')

btn_cadProduto.addEventListener('click', (e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const quantidade = document.getElementById('quantidade').value
    const codLote = document.getElementById('codLote').value
    const idFornecedor = document.getElementById('idFornecedor').value
  


    const valores = {
       descricao: descricao,
       categoria: categoria,
       quantidade: quantidade,
       codLote: codLote,
       idFornecedor: idFornecedor,
    }

    fetch(`http://localhost:3000/produto`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)

    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `${dados.message}`
    })

    .catch((err)=>{
        console.error('Erro ao cadastrar o usuário',err)

    })

})