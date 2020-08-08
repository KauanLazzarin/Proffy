const express = require('express')
const server = express()
const port = 3003
const nunjucks = require('nunjucks')

const proffys = [
    {
        name: 'Diego Fernandes',
        avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
        whatsapp: 40028922,
        bio: 'Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: 'Química',
        cost: 'R$20,00',
        weekday: [0],
        time_from: [729],
        time_to: [1200]
    }
]

const subjects = [
    'Artes',
    'Biologia',
    'Ciências',
    'Educação Física',
    'Física',
    'Geografia',
    'História',
    'Matemática',
    'Português',
    'Química',
]

const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

const getSubject  = (subjectNumber)  => {
    const position = +subjectNumber - 1
    return subjects[position]
}


const pageLanding = (require, response) => {
    return response.render('index.html',)
}

const pageStudy = (require, response) => {
    const filters = require.query
    response.render('study.html', {proffys, filters, subjects, weekDays})
}

const pageGiveClasses = (require, response) => {
    const data = require.query
    
    //Fazer a verificação para saber se os dados existem ou estão vazios    
    const isNotEmpty = Object.keys(data).length != 0 
    
    // Se houver dados e o formulário for enviado com sucesso, redirecionar para a page study
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return response.redirect('/study')
    }    


    response.render('give-classes.html')
}

// Configurar nunjucks
nunjucks.configure ('src/views', {
    express: server,
    noCache: true,
})

server
    // Configurar arquivos estáticos
    .use(express.static('public'))

    //COnfigurar rotas
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .listen(port, console.log(`Rodando o servidor na porta ${port}`))


