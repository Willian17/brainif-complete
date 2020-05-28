<template>
  <footer class="footer">
    <div class="copyright">
      <span>
        Copyright
        <strong>BrainIF</strong> © 2020 <br>
      </span>
    </div>
    <div class="icons">
      Ícones feitos por
      <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik </a> from
      <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ebf2f7;
  color: #687b8c;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 20px;

  height: 12.5vh;
}
.copyright{
  margin-bottom: 15px;
}


</style>