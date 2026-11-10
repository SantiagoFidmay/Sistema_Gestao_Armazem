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
        
        const res = await fetch(`http://localhost:3000/produto/${id}`,{
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
                    <th>descricao</th>
                    <th>categoria</th>
                    <th>quantidade</th>
                    <th>codLote</th>
                    <th>idFornecedor</th>
            
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_produto}</td>
                    <td>${dados.descricao}</td>
                    <td>${dados.categoria}</td>
                    <td>${dados.quantidade}</td>
                    <td>${dados.codLote}</td>
                    <td>${dados.idFornecedor}</td>
                 
                </tr>
            </tbody>
        </table>

        `

    } catch (err) {
        console.error('Erro ao consultar o fornecedor', err)
        resposta_consultID.innerHTML = '<p>Erro ao consultar o fornecedor!</p>'
    }
})