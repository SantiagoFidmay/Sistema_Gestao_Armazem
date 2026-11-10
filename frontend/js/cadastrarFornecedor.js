const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}


const resposta = document.getElementById('resposta')
const btn_cadFornecedor = document.getElementById('btn_cadFornecedor')

btn_cadFornecedor.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value


    const valores = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
    }

    fetch(`http://localhost:3000/fornecedor`,{
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