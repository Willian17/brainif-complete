<template>
  <div class="responses-question">
    <QuestionItem :question="question" />
    <div v-if="responses.length > 0" class="responses">
      <h2>Respostas</h2>
      <ul>
        <li v-for="response in responses" :key="response.id">
          <ResponseItem :response="response" />
        </li>
      </ul>
    </div>
   <CreateResponse />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";

import QuestionItem from "../questions/QuestionItem";
import ResponseItem from "./ResponseItem";
import CreateResponse from './CreateResponse'
export default {
  name: "responsesByQuestion",
  components: { QuestionItem, ResponseItem , CreateResponse },
  data: function() {
    return {
      question: {},
      responses: []
    };
  },
  methods: {
    getQuestion() {
      const url = `${baseApiUrl}/questions/${this.question.id}`;
      axios(url).then(res => (this.question = res.data));
    },
    getResponses() {
      const url = `${baseApiUrl}/responses/questions/${this.question.id}`;
      axios(url).then(res => (this.responses = res.data));
    }
  },
  mounted() {
    this.question.id = this.$route.params.id;
    this.getQuestion();
    this.getResponses();
  }
};
</script>

<style>
.responses-question{
  padding: 20px;
}
.responses {
  background: #fff;
  padding: 20px;
  margin-top: 25px;
}
.responses h2 {
  margin-bottom: 22px;
  color: #5c5346;
}
.responses ul {
  list-style-type: none;
  padding: 0;
}
.responses li {
  margin-bottom: 50px;
  border-bottom: 1px solid #F4F5FB;
}
</style>