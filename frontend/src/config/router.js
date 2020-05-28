import Vue from 'vue';
import VueRouter from 'vue-router'

import Categories from '../components/categories/Categories'
import Questions from '../components/questions/QuestionByCategory'
import Response from '../components/responses/ResponseByQuestion'
import CreateQuestion from '../components/questions/CreateQuestion'
import Home from '../components/home/Home'
import AuthStudent from '../components/authenticate/AuthStudent'
import AuthTeacher from '../components/authenticate/AuthTeacher'

Vue.use(VueRouter)

const routes = [{
    name: 'categories',
    path: '/', 
    component: Categories
} , {
    name: 'questionsByCategory',
    path: '/categories/:id/questions',
    component: Questions
}, {
    name: 'responsesByQuestion',
    path: '/responses/questions/:id',
    component: Response
}, {
    name: 'createQuestion',
    path: '/create/question',
    component: CreateQuestion
}, {
    name: 'home',
    path: '/home',
    component: Home
}, {
    name:'authStudent',
    path: '/auth/student',
    component: AuthStudent
}, {
    name:'authTeacher',
    path: '/auth/teacher',
    component: AuthTeacher
}]


export default new VueRouter({
    mode: 'history',
    routes
})