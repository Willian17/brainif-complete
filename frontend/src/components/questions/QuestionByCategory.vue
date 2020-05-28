<template>
  <div class="questions-by-category">
    <Title v-if="category.name" :main="category.name" />

    <div v-if="user.student" class="add-question">
      <span>Tire sua dúvida</span>
      <router-link to="/create/question">
        <button class="btn btn-primary">Faça sua pergunta</button>
      </router-link>
    </div>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <QuestionItem :question="question" />
      </li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore"
        class="btn btn-outline-primary"
        @click="getQuestions"
      >Carregar mais perguntas</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import {mapState} from 'vuex'

import Title from "../template/TitleCategory";
import QuestionItem from "./QuestionItem";
export default {
  name: "Questions",

  components: { Title, QuestionItem },

  computed: mapState(['user']),

  data: function() {
    return {
      category: {},
      questions: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    getCategory() {
      axios(`${baseApiUrl}/categories/${this.category.id}`).then(
        res => (this.category = res.data)
      );
    },
    getQuestions() {
      axios(
        `${baseApiUrl}/categories/${this.category.id}/questions?page=${this.page}`
      ).then(res => {
        this.questions = this.questions.concat(res.data);
        this.page++;

        if (res.data.length === 0) this.loadMore = false;
      });
    }
  },

  watch: {
    $route(to) {
      this.category.id = to.params.id;
      this.questions = [];
      this.page = 1;
      this.loadMore = true;

      this.getCategory();
      this.getQuestions();
    }
  },

  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getQuestions();
  }
};
</script>

<style>
.questions-by-category{
  padding: 20px;
}

.add-question {
  background: #fff;
  padding: 20px;
  margin-bottom: 1px;
}
.add-question span{
  display: block;
  margin-left: 15px;
  font-size: 3rem;
}
.add-question button  {
  margin-left: 25px;
}
.questions-by-category ul {
  list-style-type: none;
  padding: 0;
}

.questions-by-category li {
  margin-bottom: 1px;
}

.questions-by-category .load-more {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 767.98px) {
  .add-question span{
    font-size: 2rem;
  }
 }
</style>