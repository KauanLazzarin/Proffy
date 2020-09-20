// Importar o banco de dados
const dataBase = require('sqlite-async')


//Função exec do banco de dados
function execute (data) {
    return data.exec(`
        CREATE TABLE IF NOT EXISTS proffys_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject integer,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule_data ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

//Abrir o arquivo sqlite
module.exports = dataBase.open(__dirname + '/database.sqlite')
    .then(execute)