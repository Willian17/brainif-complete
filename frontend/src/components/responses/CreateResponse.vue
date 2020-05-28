<template>
  <div v-if="!user.student" class="createQuestion">
    <b-form-textarea
    id="textarea"
    class="mt-3"
    v-model="response.content"
    placeholder="Responda aqui"
    rows="3"
    max-rows="10"
    >

    </b-form-textarea>
    <b-button class="mt-3" @click="postResponse" variant="success">Enviar</b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios'
import {baseApiUrl , showError} from '@/global'

export default {
  name: "createResponse",
  computed: mapState(["user"]),
  data: function(){
      return {
          response : {
              content: '',
              teacherId: null,
              questionId: null
          }
      }
  },
  methods:{
      postResponse(){
          axios.post(`${baseApiUrl}/responses` , this.response)
          .then(()=>{
              this.$toasted.global.msgSuccess()
            this.response.content = ''
          })
          .catch(showError)
      },
  },
  mounted(){
      this.response.teacherId = this.user.id 
      this.response.questionId = this.$route.params.id
  }
};
</script>

<style>
.createQuestion{
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
}
</style>