<template>
  <div id="app" :class="{'hide-menu': !user }">
   <Header />
   <Menu v-if="user" class="menu" />
   <Loading v-if="validatingToken" />
   <Content v-else />
   <Footer />

  </div>
</template>

<script>
import axios from 'axios';
import {baseApiUrl , userKey} from '@/global'
import {mapState} from 'vuex';
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Loading from './components/template/Loading'

export default {
  name: "App",
  components: {Header , Menu , Content , Footer , Loading},
  computed: mapState(['user']),
  data: function(){
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken(){
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)

      this.$store.commit('setUser' , null)

      if(!userData){
        this.validatingToken = false
        this.$router.push('/home')
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken` , userData)

      if(res.data){
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push('/home')
      }

      this.validatingToken = false

    }
  },
created() {
		this.validateToken()
	}
};
</script>

<style>
 *{
   font-family: "Lato" , sans-serif;
 }
 body{
   margin: 0;
   background-color: #F4F5FB;
 }

 #app{
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;

   height: 100vh;
   display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;

    grid-template-areas: 
    "header header"
    "menu content"
    "menu footer";
 }
 #app.hide-menu{
   grid-template-columns: 1fr ; 
   grid-template-areas: 
   "header header"
   "content content"
   "footer footer";
 }


 
@media (max-width: 767.98px) { 
  #app{
   grid-template-columns: 1fr ; 
   grid-template-areas: 
   "header header"
   "content content"
   "footer footer";
    ;
  }
  .menu{
    display: none;
  }

 }
</style>
