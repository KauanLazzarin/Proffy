const express = require('express')
const server = express()
const port = 3003
const nunjucks = require('nunjucks')
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages.js')


// Configurar nunjucks
nunjucks.configure ('src/views', {
    express: server,
    noCache: true,
})

server
    .use(express.urlencoded({extended:true}))
    // Configurar arquivos estáticos
    .use(express.static('public'))

    //COnfigurar rotas
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .post('/save-classes', saveClasses)
    .setMaxListeners(Infinity)
    .listen(port, console.log(`Rodando o servidor na porta ${port}`))


