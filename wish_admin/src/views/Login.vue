<template>
  <div class="login">sss</div>
</template>

<script>
import {login} from '@/api/login'
export default {
    name:'MyLogin',
    created(){
      this.login()
    },
    methods:{
      login(){
        login({
          username:'admin',
          password:'11'
        }).then((res)=>{console.log('res',res)}).catch(err => {console.log('err',err)})
      }
    }
}
</script>

<style>

</style>