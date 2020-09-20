const {subjects, weekDays, getSubject, convertHourToMinutes} = require('./utils/format.js')
const dataBase = require('./database/db.js')

const pageLanding = (req, res) => {
    return res.render('index.html',)
}

const pageStudy = async (req, res) => {

    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
       return res.render('study.html', { filters, subjects, weekDays })
    }

    // Converter horas em minutos
    const timeToMinutes = convertHourToMinutes(filters.time)

    const query = `
        SELECT classes_data.*, proffys_data.*
        FROM proffys_data
        JOIN classes_data ON (classes_data.proffy_id = proffys_data.id)
        WHERE EXISTS(
            SELECT class_schedule_data.*
            FROM class_schedule_data
            WHERE class_schedule_data.class_id = classes_data.id
            AND class_schedule_data.weekday = ${filters.weekday}
            AND class_schedule_data.time_from <= ${timeToMinutes}
            AND class_schedule_data.time_to > ${timeToMinutes}
        )
        AND classes_data.subject = '${filters.subject}'
    `

    try {
        const db = await dataBase
        const proffys = await db.all(query)
    
        return res.render('study.html', { proffys, weekDays, subjects, filters })
    } catch (error) {
        console.log(error)
    }
}

const pageGiveClasses = (req, res) => {
    return res.render('give-classes.html', {subjects, weekDays})
}

const saveClasses = async (req, res) => {
    const createProffy = require('./database/createProffy.js')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHourToMinutes (req.body.time_from[index]),
            time_to: convertHourToMinutes (req.body.time_to[index])
        }
    })

    try {
        const db = await dataBase
        await createProffy(db, { proffyValue, classValue, classScheduleValues  })
        
        let queryString = "?subject=" + req.body.subject
        queryString += "&time_from" + req.body.time_from
        console.log('Registros adicionados com sucesso!')
        return res.redirect('/study' + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
