module.exports = db => {
    const { existsOrError } = require('./validation')

    const save = async (req, res) => {
        const { content, categoryId } = req.body
        let { studentId } = req.body
        studentId = studentId.toString()
        const date = new Date().toLocaleDateString();


        try {
            existsOrError(content, 'dúvida não informada')
            existsOrError(studentId, 'aluno não informado')
            existsOrError(categoryId, 'matéria não informada')
            try {
                existsOrError(date, 'data não informada')
            } catch (msg) {
                return res.status(500).send(msg)
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }


        await db('questions')
            .insert({
                content,
                date,
                studentId,
                categoryId
            }
            )
            .then(_ => res.status(204).send())
            .catch(error => {
                res.status(500).send(error)
            })
    }
    const get = async (req, res) => {
        await db('questions')
            .then(question => res.json(question))
            .catch(error => res.status(500).send(error))
    }


    const getById = async (req, res) => {
        await db({ question: 'questions', student: 'students' })
            .select('question.id', 'question.content', 'question.date',
                { author: 'student.username' }, { year: 'student.year' }, { course: 'student.course' })
            .whereRaw('?? = ??', ['student.registration', 'question.studentId'])
            .where({ id: req.params.id })
            .first()
            .then(question => res.json(question))
            .catch(error => res.status(500).send(error))

    }
    const limit = 10;
    const getByCategory = async (req, res) => {
        const page = req.query.page || 1

        await db({ question: 'questions', student: 'students' })
            .select('question.id', 'question.content', 'question.date',
                { author: 'student.username' }, { year: 'student.year' }, { course: 'student.course' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['student.registration', 'question.studentId'])
            .where({ categoryId: req.params.id })
            .orderBy('question.id', 'desc')
            .then(data => res.json(data))
            .catch(error => {
                res.status(500).send(error)
            })

    }
    const remove = async (req, res) => {
        const id = req.params.id
        await db('questions').where({ id }).del()
        res.send(id)
    }

    return { save, get, getById, getByCategory , remove }
}