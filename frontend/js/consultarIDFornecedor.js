const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta_consultID = document.getElementById('resposta_consultID')
const btn_consultarID = document.getElementById('btn_consultarID')

btn_consultarID.addEventListener('click', async(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        
        const res = await fetch(`http://localhost:3000/fornecedor/${id}`,{
        headers: {'Authorization': token}
    })

        const dados = await res.json()

        if(!dados || dados.message){
            return resposta_consultID.innerHTML = `<p>${dados.message || 'Fornecedor não encontrado!'}</p>`
        }

        resposta_consultID.innerHTML = `
        
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_motorista}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.email}</td>
                    <td>${dados.telefone}</td>
                </tr>
            </tbody>
        </table>

        `

    } catch (err) {
        console.error('Erro ao consultar o fornecedor', err)
        resposta_consultID.innerHTML = '<p>Erro ao consultar o fornecedor!</p>'
    }
})