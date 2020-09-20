const dataBase = require('./db.js')
const createProffy = require('./createProffy.js')


dataBase
    .then(async (db) => {
        //inserir dados

        proffyValue = {
            name: 'Diego Fernandes',
            avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
            whatsapp: 40028922,
            bio: 'Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',

        }

        classValue = {
            subject: 1,
            cost: 'R$20,00',
            weekday: [0],
            time_from: [729],
            time_to: [1200]

            // o proffy_id virá pelo banco de dados
        }

        classScheduleValues  = [
            {
                weekday: 1,
                time_from: 720,
                time_to: 1200
            },
            {
                weekday: 2,
                time_from: 420,
                time_to: 800
            }
        ]

        // await createProffy(db, {proffyValue, classValue, classScheduleValues})
        
        // Consultar todos os proffys

        const registeredProffys = await db.all("SELECT * FROM proffys_data")

        // Consultar as classes
        const registeredClassesFromProffy = await db.all(`
            SELECT classes_data.*, proffys_data.*
            FROM proffys_data
            JOIN classes_data ON (classes_data.proffy_id = proffys_data.id)
            WHERE classes_data.proffy_id = 1;
        `)

        //Filtrar os proffys 

        const filteredSchedules = await db.all (`
            SELECT class_schedule_data.*
            FROM class_schedule_data
            WHERE class_schedule_data.class_id = 1
            AND class_schedule_data.time_from >= 420
            AND class_schedule_data.time_to <=820
        `)
    })