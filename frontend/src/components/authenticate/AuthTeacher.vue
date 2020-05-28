<template>
 <div class="login">
    <div class="container-form">
      <h1 v-if="!showSignup">Fazer login</h1>
      <h1 v-else>Fazer cadastro</h1>
      <b-form>
        <b-form-input v-if="showSignup" v-model="teacher.name" placeholder="Nome" class="mb-3"></b-form-input>
        <b-form-input  v-model="teacher.email" type="email" placeholder="Email" class="mb-3"></b-form-input>
        <b-form-input type="password" v-model="teacher.password" placeholder="Senha" class="mb-3"></b-form-input>
        <b-form-input type="password" v-if="showSignup" v-model="teacher.confirmPassword" placeholder="Confirmar senha" class="mb-3"></b-form-input>
             <!-- trocar por select  -->

        <!-- <b-form-group v-if="showSignup" label="Disciplina"> 
          <b-form-radio-group >
            <b-form-radio v-for="category in categories" :key="category.id" v-model="teacher.categoryId" name="radio-options" :value="category.name">{{category.name}}</b-form-radio>
          </b-form-radio-group>
        </b-form-group> -->

        <select v-if="showSignup" class="form-control" v-model="teacher.categoryId">
           <option :value="null" selected disabled >Selecionar Disciplina</option>
          <option v-for="category in categories" :key="category.id" :value="category.id" >{{category.name}}</option>
        </select> 

        <b-form-group v-if="showSignup" label="Formação" class="mt-3"> 
          <b-form-radio-group >
            <b-form-radio  name="radio-options"  v-model="teacher.formation" value="Especialização">Especialização </b-form-radio>
            <b-form-radio  name="radio-options"  v-model="teacher.formation" value="Mestrado">Mestrado </b-form-radio>
            <b-form-radio  name="radio-options" v-model="teacher.formation" value="Doutorado">Doutorado </b-form-radio>
            <b-form-radio  name="radio-options"  v-model="teacher.formation" value="Pós-doutorado">Pós-doutorado </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-form>

      <div v-if="!showSignup">
        <b-button
          variant="outline-primary"
          class="mr-3 mt-3"
          @click.prevent="showSignup = true"
        >Criar uma conta</b-button>
        <b-button type="submit" variant="primary" @click="signin" class="mt-3">Entrar</b-button>
      </div>
      <div v-else>
        <b-button
          variant="outline-primary"
          class="mr-3 mt-3"
          @click.prevent="showSignup = false"
        >Faça o login</b-button>
        <b-button type="submit" variant="primary" @click="signup" class="mt-3">Registrar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
export default {
  data: function() {
    return {
      teacher: {},
      showSignup: false,
      categories: []
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/teacher-signin`, this.teacher)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ name: 'categories' });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/teacher-signup`, this.teacher)
        .then(() => {
          this.$toasted.global.msgSuccess();
          this.teacher = {};
          this.showSignup = false;
        })
        .catch(showError);
    }
},
    mounted(){
       axios.get(`${baseApiUrl}/categories`).then(res => this.categories = res.data);
    }
}
       
</script>

<style>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-form {
  padding: 35px;
  width: 500px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 10px;
}

.container-form h1 {
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
}


</style>