/*
    Aqui vai a lógica de 
    inserção de dados
*/

module.exports = async function (db, {proffyValue, classValue, classScheduleValues}) {
    // Inserir os dados na tabela de proffys
    
    /* 
        O async/await funciona da mesma forma
        do then(), apenas é uma forma mais legível e 
        mais bonita de se escrever varias chamadas
        que usariam o then()
    */
    
    const insertedProffy= await db.run(`
        INSERT INTO proffys_data (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        ); 
    `)
     
    const proffy_id = insertedProffy.lastID

    // Inserir dados na table de classes

    const insertedClass = await db.run(`
        INSERT INTO classes_data (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela de agendamento de classes
    // Para cada horario, ele irá guardar um db.run()

    const insertedScheduleValues = classScheduleValues.map((value) => {
        return db.run (`
            INSERT INTO class_schedule_data (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            );
        `)
    })
    
    await Promise.all(insertedScheduleValues)


}