<template>
  <div class="content">
    <Title icon="fa fa-home" main="Disciplinas" sub="Escolha uma disciplina para sanar sua dúvida" />
    <div class="categories">
      <CategoryItem
        v-for="category in categories"
        :key="category.id"
        :main="category.name"
        :id="category.id"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";

import CategoryItem from "./CategoryItem";
import Title from "../template/Title";
export default {
  name: "Categories",
  data: function() {
    return {
      categories: []
    };
  },

  components: { CategoryItem, Title },

  methods: {
    getCategories() {
      axios.get(`${baseApiUrl}/categories`).then(res => {
        this.categories = res.data;
      });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<style>
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
}

/* // Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) { 
   .categories {
    padding: 5px;
    grid-template-columns: 1fr ;
  }
 }

/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) { 
   .categories {
    padding: 10px;
    grid-template-columns: 1fr 1fr ;
  }
 }

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) { 
   .categories {
    padding: 15px;
    grid-template-columns: 1fr 1fr 1fr ;
  }
 }

</style>