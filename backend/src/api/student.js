const bcrypt = require('bcrypt-nodejs')

module.exports = db => {
    const {existsOrError , notExistsOrError , equalsOrError ,
         rightSizeOrError , yearOrError} = require('./validation')

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password , salt) 
    }

    const save = async (req, res) => {
      const {registration , name , username , year , 
          confirmPassword , email , course } = req.body
          let {password} = req.body

        try{
            existsOrError(registration , 'número de mtrícula não informado')
            existsOrError(name , 'nome não informado')
            existsOrError(username , 'username não foi informado')
            existsOrError(year , 'ano do ensino médio não informado')
            yearOrError(year , 'ano de ensino médio invalido')
            existsOrError(password , 'senha não informada')
            rightSizeOrError(password , 'a senha deve conter no mínimo 8 caracteres')
            existsOrError(confirmPassword , 'confirmação de senha invalida')
            equalsOrError(password , confirmPassword , 'senha não conferem')
            existsOrError(email , 'email não informado')
            existsOrError(course , 'curso técnico não informado')


            const registrationDb = await db('students').where({registration}).first()
            const userNameFromDb = await db('students').where({username}).first()
            const emailFromDb = await db('students').where({email}).first()

            notExistsOrError(registrationDb , 'número de matrícula já cadastrado')
            notExistsOrError(userNameFromDb , 'username já existente')
            notExistsOrError(emailFromDb , 'email já cadastrado')
        } catch(msg){
            return res.status(400).send(msg)
        }

        password = encryptPassword(password)

        await db('students').insert({
            registration, name, 
            username, year , 
            password, email, 
            course
        }).then(_ => res.status(204).send())
        .catch(error => res.status(500).send(error))


    } 

    const get = async (req, res) => {
            await db('students')
            .then(data => res.json(data))
            .catch(error => res.status(500).send(error))
    }

    const byId = async (req , res) =>{
        await db('students')
        .select('username' , 'year' , 'course')
        .where({registration : req.params.id})
        .first()
        .then(student => res.json(student))
        .catch(error => res.status(500).send(error))
    }

    const remove = async (req , res) =>{
        await db('students').where({registration: req.params.id}).del()
        res.status(204).send()
    }

    return {save , get , byId , remove}
}