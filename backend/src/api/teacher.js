const bcrypt = require('bcrypt-nodejs')

module.exports = db => {
    const {existsOrError , notExistsOrError , equalsOrError , rightSizeOrError , ifmtEmailOrError} = require('./validation')

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password , salt)
    }

    const save = async (req , res) =>{
       const teacher = {...req.body}

       try{
           existsOrError(teacher.name , 'nome não informado') 
           existsOrError(teacher.email , 'email não informado') 
           ifmtEmailOrError(teacher.email , 'o email deve ser do IFMT campus Rondonópolis!') 
           existsOrError(teacher.password, 'senha não informada') 
           rightSizeOrError(teacher.password , 'senha deve conter no mínimo 8 caracteres')
           existsOrError(teacher.confirmPassword, 'Confirmação de senha invalida') 
           equalsOrError(teacher.password , teacher.confirmPassword , 'Senha não conferem')
           existsOrError(teacher.formation , 'formação não informada') 
           existsOrError(teacher.categoryId , 'disciplina não informada') 

           const teacherFromDB = await db('teachers')
           .where({email: teacher.email})
           .first()

           notExistsOrError(teacherFromDB , 'Professor já cadastrado')
       } catch (msg){
           return res.status(400).send(msg)
       }

       teacher.password = encryptPassword(teacher.password)
       delete teacher.confirmPassword

      await db('teachers')
       .insert(teacher)
       .then(_ => res.status(204).send())
       .catch(err => res.status(500).send(err))
    }

    const get = async (req ,res) =>{
       await db('teachers')
       .then(teachers => res.json(teachers))
       .catch(err => res.status(500).send(err))
    }

    const byId = async (req, res) => {
        await db('teachers')
        .select('name' , 'formation' , 'categoryId')
        .where({id: req.params.id})
        .first()
        .then(teacher => res.json(teacher))
        .catch(error => res.status(500).send(error))
    }

    const remove = async (req, res) => {
       const id = req.params.id
      await db('teachers').where({id}).del()
       res.send(id)
    } 
    return {save , get , remove , byId}
}