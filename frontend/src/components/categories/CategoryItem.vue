<template>
  <div class="category">
    <img :src="url" width="50px" />
    <router-link :to="'/categories/' + id + '/questions'">
      <span>{{main}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CategoryItem",
  props: ["main", "icon", "id"],
  computed: {
    url() {
      return require(`@/assets/img/${this.main}.svg`);
    }
  }
};
</script>

<style>
.category {
  padding: 25px;
  margin: 10px;
  background: #fff;
}

.category a:hover {
  text-decoration: none;
} 
.category a span {
  color: #7a849c;
  transition: color 1s;
  font-size: 1.3em;
  margin-left: 5px;
}

.category a span:hover {
  color: #63458a;
}

@media(max-width: 765px){
  .category:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
}
</style>