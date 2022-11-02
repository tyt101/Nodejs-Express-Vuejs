<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="loginForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {
    name:'MyLogin',
    data(){
      return{
        formData:{
          username:'',
          password:''
        },
        rules:{
          username:[{
            required:true,message:'请输入用户名',trigger:'blur'
          }],
          password:[{
            required:true,message:'请输入密码',trigger:'blur'
          }]
        }
      }
    },
    // created(){
      // this.handleLogin()
    // },
    methods:{
      handleLogin(){
        const {username,password} = this.formData
        this.$refs['loginForm'].validate(isOk => {
          if(isOk){
            login({
              username,
              password,
            }).then((res)=>{
              const {code,data} = res.data
              console.log(data)
              if(code === 10000){
                localStorage.setItem('token',data.token)
                localStorage.setItem('name',data.name)
                this.$router.push('/dashboard');
              }
            }).catch(err => {console.log('err',err)})
          }
        })
        
      }
    }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  &-container{
    position: absolute;
    width: 500px;
    height: 300px;
    background-color: rgba($color: #c6d973, $alpha: 1);
    margin:auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
  }
}
.el-form{
  margin: 0 auto;
  margin: 60px 20px;
  &-item{
    width: 380px;
  }
}

</style>