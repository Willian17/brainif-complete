<template>
  <aside class="menu">
    <ul>
      <li class="father-nav">
        <router-link to="/">Home</router-link>
      </li>
      <li class="father">Disciplinas</li>
      <li v-for="category in categories" :key="category.id" class="child">
        <router-link :to="'/categories/' + category.id + '/questions'">
            {{category.name}}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "Menu",
  data: function() {
    return {
      categories: []
    };
  },
  methods: {
    getCategories() {
      axios(`${baseApiUrl}/categories`).then(
        res => (this.categories = res.data)
      );
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to bottom, #372476, #3a173b);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  width: 100%;
  height: 100vh;
  overflow: auto;
}
.menu ul {
  width: 100%;
  list-style-type: none;
  margin-top: 30px;
  padding: 0;
  white-space: nowrap;
}
.menu ul li {
  width: 100%;
  color: #fff;
}
.menu li a {
  color: #fff;
  font-weight: 500;
  padding: 7px 24px 7px 16px;
  line-height: 1.5;
  border-right: 0;
}
.menu li a:hover {
  text-decoration: none;
  color: #fff;
}
.father-nav a {
  position: relative;
  display: block;
}
.father-nav:hover {
  background: #542683;
}
.father {
  color: #fff;
  font-weight: lighter;
  font-size: 14px;
  padding: 0.45rem 0 0.45rem 1rem;
}
.child {
  margin-left: 16px;
  border-left: 1px solid #e6ecf1;
  padding: 7px 24px 7px 16px;
}
.child:hover {
  background-color: #542683;
}
</style>