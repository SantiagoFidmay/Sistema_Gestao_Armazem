
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadMovimento = document.getElementById('btn_cadMovimento')

btn_cadMovimento.addEventListener('click', (e)=>{
    e.preventDefault()

    const tipo = document.getElementById('tipo').value
    const quantidade = document.getElementById('quantidade').value
    const data = document.getElementById('data').value
    const idProduto = document.getElementById('idProduto').value

    const valores = {
        tipo: tipo,
        quantidade: quantidade,
        data: data,
        idProduto: idProduto
    }

    fetch(`http://localhost:3000/movimento`,{
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
        console.error('Erro ao cadastrar o movimento',err)
    })

})
