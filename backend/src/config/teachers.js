module.exports = middlewre =>{
    return (req , res , next) => {
        if(!req.user.student){ // teacher
            middlewre(req, res , next)
        } else {
            res.status(401).send('O usuário não é um professor')
        }
    }
}