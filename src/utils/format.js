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

// Função para converter as horas do input para minuto
const convertHourToMinutes = (time) => {
    const [hour, minute] = time.split(':')
    return (hour * 60) + minute
}

module.exports = {
    subjects, 
    weekDays, 
    getSubject,
    convertHourToMinutes
}
