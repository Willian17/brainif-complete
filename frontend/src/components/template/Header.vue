<template>
  <header class="header" >
    <b-navbar :toggleable="false"  type="dark">
      <b-navbar-brand router-link :to="user ? '/' : '/home'">
        <i class="fa fa-graduation-cap"></i> BrainIF
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse v-if="user" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em> {{user.name}} <img src="../../assets/aluna.svg" width="36px"></em>
            </template>
              <b-dropdown-item @click="logout" ><i class="fa fa-sign-out"></i> Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import {userKey} from '@/global'
import {mapState} from 'vuex'
export default {
  name: "Header",
  computed:mapState(['user']),
  methods: {
    logout(){
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({name: 'home'})
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background-color: #372476;

}

.header > img {
  background-color: #372476;
}
</style>