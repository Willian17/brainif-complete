<template>
  <div class="login">
    <div class="container-form">
      <h1 v-if="!showSignup">Fazer login</h1>
      <h1 v-else>Fazer cadastro</h1>
      <b-form>
        <b-form-input
          v-if="showSignup"
          v-model="student.registration"
          placeholder="Número de matrícula"
          class="mb-3"
        ></b-form-input>
        <b-form-input
          v-if="showSignup"
          v-model="student.name"
          placeholder="Nome completo"
          class="mb-3"
        ></b-form-input>
        <b-form-input v-model="student.username" placeholder="UserName" class="mb-3"></b-form-input>
        <b-form-input type="email" v-if="showSignup" v-model="student.email" placeholder="Email" class="mb-3"></b-form-input>
        <b-form-input type="password" v-model="student.password" placeholder="Senha" class="mb-3"></b-form-input>
        <b-form-input
          type="password"
          v-if="showSignup"
          v-model="student.confirmPassword"
          placeholder="Confirmar senha"
          class="mb-3"
        ></b-form-input>

        <b-form-group v-if="showSignup" label="Ano no ensino médio">
          <b-form-radio-group>
            <b-form-radio v-model="student.year" name="radio-options" value="1">1° ano</b-form-radio>
            <b-form-radio v-model="student.year" name="radio-options" value="2">2° ano</b-form-radio>
            <b-form-radio v-model="student.year" name="radio-options" value="3">3° ano</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group v-if="showSignup" label="Curso técnico">
          <b-form-radio-group>
            <b-form-radio
              v-model="student.course"
              name="some-radios"
              value="Informática"
            >Informática</b-form-radio>
            <b-form-radio v-model="student.course" name="some-radios" value="Química">Química</b-form-radio>
            <b-form-radio v-model="student.course" name="some-radios" value="Alimentos">Alimentos</b-form-radio>
            <b-form-radio
              v-model="student.course"
              name="some-radios"
              value="Secretariado"
            >Secretariado</b-form-radio>
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
        <b-button variant="primary" @click="signup" class="mt-3">Registrar</b-button>
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
      student: {},
      showSignup: false
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/student-signin`, this.student)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ name: 'categories' });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/student-signup`, this.student)
        .then(() => {
          this.$toasted.global.msgSuccess();
          this.student = {};
          this.showSignup = false;
        })
        .catch(showError);
    }
  }
};
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