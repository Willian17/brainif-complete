<template>
  <div class="content home">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Sane sua dúvida com o BrainIF</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>A melhor plataforma de fórum, para acabar com sua dúvida com excelentes professores</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link to="/auth/teacher">
            <b-button pill variant="light" size="lg">
              Sou um professor
              <i class="fa fa-arrow-right text-14"></i>
            </b-button>
          </router-link>
          <router-link to="/auth/student">
            <b-button pill variant="outline-light" size="lg" class="ml-3">
              Sou um aluno
              <i class="fa fa-arrow-right text-14"></i>
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.content .home {
  box-sizing: border-box;
  background-image: url("../../assets/background-home.png");
  background-position: top center;
  background-size: 100% auto;
  height: 1000px;

  text-align: center;
}
.row .col h1 {
  margin-top: 20%;
  color: #fff;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}
.row .col p {
  color: #fff;
  font-size: 1.25rem;
  font-weight: normal;
}

@media (max-width: 575.98px) { 
  .row .col p {
  display: none;
}
.row .col h1 {
  font-size: 2.0rem;
}
.btn.btn-outline-light.btn-lg  , .btn.btn-light.btn-lg {
  margin-top: 10px;
}
 }
</style>