<template>
  <div class="header">
    <div class="collapse-btn" @click="handleMenuW">
        <i class="el-icon-menu"></i>
    </div>
    <div class="logo">许愿墙管理后台</div>
    <div class="header-right">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    name:'VHeader',
    data(){
        return{
            name:localStorage.getItem('name')
        }
    },
    methods:{
        handleMenuW(){
            this.$bus.$emit('elapseChange')
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    position: relative;
    background-color: black;
    height: 80px;
    color: #ffffff;
    font-size: 22px;
    line-height: 80px;
    display: flex;
    &-right{
        position: absolute;
        right: 30px;
        .el-dropdown-link{
            color: #ffffff;
            font-size: 16px
        }
    }
}
.collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
}
</style>