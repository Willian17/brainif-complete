<template>
    
    <div class="create-question mt-3 ml-3">
        <h3>Descreva sua dúvida </h3>

        <b-form-textarea 
        id="textarea"
        class="mt-3"
        v-model="content"
        placeholder="Escreva sua dúvida aqui"
        rows="3"
        max-rows="10"
        >
        </b-form-textarea>

        <b-form-select v-model="categoryId" :options="options" class="mt-3">
        </b-form-select>

        <button @click="postQuestion" class="btn btn-success mt-3">Enviar sua dúvida</button>


    </div>

</template>

<script>

import axios from 'axios';
import { baseApiUrl  , showError} from "@/global";
import {mapState} from 'vuex';

export default {
    name: 'createQuestion',
    computed: mapState(['user']),
    data: function(){
        return{
            content: '',
            categoryId: null,
            options: [
                {value: null, text: 'Selecione uma matéria' },
                {value: 1, text: 'Matématica' },
                {value: 2, text: 'Português' },
                {value: 3, text: 'Inglês' },
                {value: 4, text: 'Espanhol' },
                {value: 5, text: 'Química' },
                {value: 6, text: 'Física' },
                {value: 7, text: 'Biologia' },
                {value: 8, text: 'Filosofia' },
                {value: 9, text: 'Sociologia' },
            ]
        }
    },
    methods:{
        postQuestion(){
            const body = {content: this.content , categoryId: this.categoryId , studentId: this.user.id}
            axios.post(`${baseApiUrl}/questions` , body)
            .then(()=>{
                this.$toasted.global.msgSuccess()
                this.reset()
            })
            .catch(showError)
        },
        reset(){
            this.content = ''
            this.categoryId = null
        }
    }
}
</script>

<style>
    .create-question{
        max-width: 600px;
        padding: 30px;
        /* background: rgb(236, 236, 236); */
        background: #fff;
        border-radius: 20px;
        border: 2px solid #EBF2F7;
    }
</style>