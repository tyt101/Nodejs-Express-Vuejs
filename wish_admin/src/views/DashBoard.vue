<template>
  <div class="dash-board">
    <el-card class="box-card">
      <div slot="header" class="header">
        <div class="header-name">{{loginData.name}}</div>
        <div class="header-role">{{loginData.adminInfo}}</div>
      </div>
      <div class="body">
        <span>上次登录时间：{{loginData.lastLoginAt}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import {adminEnum} from '@/config/enums/role'
import {mapState} from 'vuex'
export default {
    name:'DashBoard',
    data(){
      return{
        adminEnum
      }
    },
    computed:{
      ...mapState({
        loginData: (state) => state.login.loginData
      }),
      adminInfo({role,adminEnum}){
        return role === adminEnum.superAdmin ? '超级管理员' : '管理员'
      }
    }
}
</script>

<style lang="scss" scoped>
.box-card{
  display: block;
  margin: 20px 10px;
  .header{
    &-name{
      font-size:30px;
    }
    &-role{
      color:rgba(0,0,0,.5);
      font-size: 12px;
    }
  }
  .body{
    height: 200px;
  }
}
</style>