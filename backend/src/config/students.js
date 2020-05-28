module.exports = middlewre =>{
    return (req , res , next) => {
        if(req.user.student){
            middlewre(req , res , next)
        } else {
            res.status(401).send('Usuário não é aluno')
        }
    }
}