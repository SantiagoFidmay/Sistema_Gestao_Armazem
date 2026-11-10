const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch('http://localhost:3000/produtos', {
        headers: {'Authorization': token}
    })
        const dados = await res.json()

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
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
                ${dados.map(el => `
                    <tr>
                        <td>${el.codigo_motorista}</td>
                        <td>${el.descricao}</td>
                        <td>${el.categoria}</td>
                        <td>${el.quantidade}</td>
                        <td>${el.codLote}</td>
                        <td>${el.idFornecedor}</td>
                    
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `
    } catch (err) {
        console.error('Erro ao listar os fornecedores', err)
        resposta.innerHTML = '<p>Erro ao listar os fornecedores.</p>'
    }
})