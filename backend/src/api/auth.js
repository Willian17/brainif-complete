const {authSecret} = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = (db) =>{

    const studentSignin = async (req,res) =>{
        if(!req.body.username || !req.body.password){
            return res.status(400).send('Informe username e senha!')
        }
        const student = await db('students')
        .where({username: req.body.username})
        .first()

        if(!student){
            return res.status(400).send('username inválido!')
        }

        const isMatch = bcrypt.compareSync(req.body.password , student.password)
        if(!isMatch){
            return res.status(400).send('senha inválida')
        }

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: student.registration,
            name: student.username,
            student: true,
            iat: now,
            exp: now + ( 60 * 60 * 24 * 3)
        }
        res.json({
            ...payload,
            token: jwt.encode(payload , authSecret)
        })
    }
    const teacherSignin = async (req , res) =>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe email e senha!')
        }

        const teacher = await db('teachers')
        .where({email: req.body.email})
        .first()

        if(!teacher){
            return res.status(400).send('email inválido!')
        }

        const isMatch = bcrypt.compareSync(req.body.password , teacher.password )
        if(!isMatch){
            return res.status(400).send('senha inválida!')
        }

        const now = Math.floor(Date.now() / 1000) // secunds desde 1970
        
        const payload = {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            student: false,
            iat: now,
            exp: now + (60 * 60 * 24 * 3) // 3 dias de expiração
        }

        res.json({
            ...payload , 
            token: jwt.encode(payload , authSecret)
        })
    }

    const validateToken = async (req, res) =>{
       const userData = req.body || null

        try{
            if(userData){
                const token = jwt.decode(userData.token , authSecret)
                if(new Date( (token.exp * 1000) > new Date())){
                    res.send(true)
                }
            }
        }catch(msg){
           res.status(500).send(msg)
        }

        res.send(false)
    }

    return{teacherSignin , studentSignin, validateToken}
}