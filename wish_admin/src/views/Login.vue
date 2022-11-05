<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="loginForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item prop="username">
          <el-input key="1" v-model="formData.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input key="2" type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2" v-if="isRegister">
          <el-input key="3" type="password" v-model="formData.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button key="4" @click="handleLogin" v-if="!isRegister">登录</el-button>
          <el-button key="5" @click="handleRegister">注册</el-button>
          <el-button key="6" @click="handleReturn" v-if="isRegister">返回登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login,register} from '@/api/login'
import {mapActions} from 'vuex'
export default {
    name:'MyLogin',
    data(){
      return{
        formData:{
          username:'',
          password:'',
          password2:'',
        },
        rules:{
          username:[{
            required:true,message:'请输入用户名',trigger:'blur'
          }],
          password:[{
            required:true,message:'请输入密码',trigger:'blur'
          }],
          password2:[{
            required:true,message:'请确认密码',trigger:'blur'
          }]
        },
        isRegister:false
      }
    },
    methods:{
      ...mapActions({
        setLoginData:'set_login_data'
      }),
      handleLogin(){
        const {username,password} = this.formData
        this.$refs['loginForm'].validate(isOk => {
          if(isOk){
            login({
              username,
              password,
            }).then((res)=>{
              const {code,data} = res.data
              if(code === 10000){
                this.$message({
                  type:'succuss',
                  message:'登陆成功 '
                })
                localStorage.setItem('loginStatus',JSON.stringify(data))
                this.setLoginData(data)
                this.$router.push('/dashboard');
              }
            }).catch(err => {console.log('err',err)})
          }
        })
        
      },
      handleRegister(){
          this.isRegister = true
          const {username,password,password2} = this.formData
          this.$refs['loginForm'].validate(isOk => {
            if(isOk){
              register({
                username,
                password,
                password2
              }).then(res => {
                const {code , msg} = res.data
                if(code === 10000){
                  this.$message({
                    type:'success',
                    message:'创建成功，即将返回登陆'
                  })
                  // TODO：注册成功，自动返回登陆
                  setTimeout(() => {
                    this.isRegister = false
                  }, 1*2000);
                }else{
                  this.$message({
                    type:'warning',
                    message:msg
                  })
                }
              }).catch(err => {
                console.log("err",err)
              })
            }
          })

          
      },
      handleReturn(){
        this.isRegister = false
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