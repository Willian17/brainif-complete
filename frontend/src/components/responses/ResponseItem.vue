<template>
  <div class="response-item">
      <UserInfo :main="response.name" :sub="`${response.formation} ${response.date}`"/>
      <div v-if="response" class="content-response">
          <p>{{response.content}}</p>
      </div>
  </div>
</template>

<script>
import UserInfo from '../template/UserInfo'
export default {
    name: 'responseItem',
    components: {UserInfo},
    props: ['response']
}
</script>

<style>
    .response-item{
        border-radius: 8px;
    }
    .content-response{
        background: #F4F5FB;
    }
    .content-response p{
         padding: 20px;
         font-size: 1.2em;
         color: #000;
    }
</style>