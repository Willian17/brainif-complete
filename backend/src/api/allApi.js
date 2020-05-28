const db = require('../database/connection')
const teacher = require('./teacher')
const student = require('./student')
const categories = require('./categories')
const questions = require('./questions')
const response = require('./response')
const auth = require('./auth')


module.exports = () => {
    const teacherSignin = auth(db).teacherSignin
    const studentSignin = auth(db).studentSignin
    const validateToken = auth(db).validateToken

    const postTeacher = teacher(db).save
    const getTeacher = teacher(db).get
    const getByIdTeacher = teacher(db).byId
    const deleteTeacher = teacher(db).remove

    const postStudent = student(db).save
    const getByIdStudent = student(db).byId
    const removeStudent = student(db).remove
    const getStudent = student(db).get

    const postCategories = categories(db).save
    const getByIdCategories = categories(db).getById
    const getCategories = categories(db).get

    const postQuestions = questions(db).save
    const getQuestions = questions(db).get
    const getByIdQuestions = questions(db).getById
    const getQuestionByCategory = questions(db).getByCategory
    const deleteQuestion = questions(db).remove

    const postResponse = response(db).save
    const getResponse = response(db).get
    const getResponseByQuestion = response(db).getResponsebyQuestion
    const deleteResponse = response(db).remove

    return {
        teacherSignin ,studentSignin , validateToken ,
        postTeacher, getTeacher, deleteTeacher, getByIdTeacher,
        postStudent, getStudent , getByIdStudent, removeStudent,
        postCategories , getCategories, getByIdCategories,
        postQuestions , getQuestions, getByIdQuestions , getQuestionByCategory , deleteQuestion,
        postResponse , getResponse , getResponseByQuestion , deleteResponse
    }
}