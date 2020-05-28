module.exports = (db) => {
    const { existsOrError } = require('./validation')
    const save = async (req, res) => {
        const { content, teacherId, questionId } = req.body
        const date = new Date().toLocaleDateString()

        try {
            existsOrError(content, 'resposta não informada')
            existsOrError(teacherId, 'professor não informado')
            existsOrError(questionId, 'questão não informada')
            try {
                existsOrError(date, 'data não informada')
            } catch (msg) {
                res.status(500).send(msg)
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
        
        const equalsCategory = await db('questions')
            .join('teachers', 'questions.categoryId', '=', 'teachers.categoryId')
            .where({ 'questions.id': questionId })
            .first()

            if(!equalsCategory){
                return res.status(400).send('Responda dúvidas da sua área')
            }
        
        await db('responses')
            .insert({
                content,
                teacherId,
                questionId,
                date
            })
            .then(_ => res.status(204).send())
            .catch(error => res.status(500).send(error))
    }

    const get = async (req, res) => {
        await db('responses')
            .then(responses => res.json(responses))
            .catch(error => res.status(500).send(error))
    }

    const getResponsebyQuestion = async (req, res) => {
        await db('responses')
            .join('teachers', 'responses.teacherId', '=', 'teachers.id')
            .select('responses.id', 'responses.content', 'responses.date',
                'teachers.name', 'teachers.formation')
            .where({ questionId: req.params.id })
            .then(responses => res.json(responses))
            .catch(error => {
                res.status(500).send(error)
            })
    }

    const remove = async (req, res) => {
        await db('responses')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())
            .catch(error => res.status(500).send(error))
    }

    return { get, save, getResponsebyQuestion, remove }
}