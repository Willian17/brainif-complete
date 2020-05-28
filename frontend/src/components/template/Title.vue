<template>
  <div class="title">
    <h1>
      <i v-if="icon" :class="icon"></i>
      {{main}}
    </h1>
    <h2 v-if="sub">{{sub}}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"]
};
</script>

<style>
.title {
  padding: 20px;
}
.title h1 {
  margin: 0px;
}
.title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}

@media(max-width: 765px){
    .title h2 {
        display: none;
    }

}
</style>