<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name:'App',
  created(){
    this.setLoginData(JSON.parse(localStorage.getItem('loginStatus')))
  },
  methods:{
    ...mapActions({
      setLoginData:'set_login_data'
    })
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
</style>