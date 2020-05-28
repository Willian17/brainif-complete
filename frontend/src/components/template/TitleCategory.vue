<template>
  <div class="title">
    <h1>
      <img :src="url" alt="icone" width="50px" />
      {{main}}
    </h1>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PageTitleCategory",
  props: ["main"],
  computed: {
    url() {
      return require(`@/assets/img/${this.main}.svg`);
    }
  }
};
</script>

<style>
div.title {
  margin: 0px;
}
</style>