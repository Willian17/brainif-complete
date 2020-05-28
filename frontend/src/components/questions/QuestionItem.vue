<template>
 <div class="question-item">
        <UserInfo :main="question.author" :sub="`${question.year}° ano ${question.course} ${question.date}`"/>
        <div class="content-nav">
            <router-link :to="'/responses/questions/' + question.id">
                {{question.content}}
            </router-link>
        </div>
 </div>
</template>

<script>
import UserInfo from '../template/UserInfo'
export default {
    name: 'questionItem',
    components: {UserInfo},
    props: ['question']
}
</script>

<style>
    .question-item{
        background: #fff;
        box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        padding: 20px;
    }

    .content-nav a{
        color: #000;
        font-size: 1.2em;
        margin: 10px 0;
        text-decoration: none;
        padding: 20px;
    }

    .content a:hover{
        color: #003;
    }

</style>