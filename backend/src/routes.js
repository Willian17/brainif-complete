const {Router} = require('express')
const routes = Router()
const api = require('./api/allApi')()
const passport = require('./config/passport')()

const teacher = require('./config/teachers')
const student = require('./config/students')

// públicas
routes.post('/teacher-signup' , api.postTeacher)
routes.post('/teacher-signin' , api.teacherSignin)

routes.post('/student-signup' , api.postStudent)
routes.post('/student-signin' , api.studentSignin)

// apagar dps
routes.get('/teachers' , api.getTeacher)
routes.get('/questions' , api.getQuestions)
routes.get('/responses' , api.getResponse)
routes.get('/students' , api.getStudent)

// routes.delete('/question/:id' , api.deleteQuestion)
// routes.delete('/responses/:id' , api.deleteResponse)
// routes.delete('/teacher/:id' , api.deleteTeacher)

routes.post('/validateToken' , api.validateToken)

// privadas
routes.get('/categories' , ( api.getCategories))

routes.all('/categories/:id' , passport.authenticate())
routes.get('/categories/:id' , api.getByIdCategories)

routes.all('/questions' , passport.authenticate())
routes.post('/questions' , student(api.postQuestions))


routes.all('/questions/:id' , passport.authenticate())
routes.get('/questions/:id' , api.getByIdQuestions)

routes.all('/categories/:id/questions' ,  passport.authenticate())
routes.get('/categories/:id/questions' , api.getQuestionByCategory)

routes.all('/responses' , passport.authenticate())
routes.post('/responses' , teacher(api.postResponse))

routes.all('/responses/questions/:id' , passport.authenticate())
routes.get('/responses/questions/:id' , api.getResponseByQuestion)


module.exports = routes