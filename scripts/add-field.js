/* 
    Algorítmo

    - Procurar o botão
    - Quando clicar no botão
    - Executar uma função
    - Adicionar novo horário
*/

const button = document.querySelector('#add-time')
button.onclick = () => cloneField()


//Função
function cloneField () {
    //Duplicar os campos

    // O node no dom não se refere ao NodeJS, e sim ao HTML
    const newFields = document.querySelector('.schedule-item')
        .cloneNode(true) // Bolean é o tipo de dado false

    //Limpar os campos
    
    const fields = newFields.querySelectorAll('input')

    // Para cada field, limpar 
    fields.forEach( (field) => {
        return field.value = ''
    })

    document.querySelector('#schedule-items').appendChild(newFields)
    //Colocar na página
}