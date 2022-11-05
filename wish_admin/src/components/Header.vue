<template>
  <div class="header">
    <div class="collapse-btn" @click="handleMenuW">
        <i class="el-icon-menu"></i>
    </div>
    <div class="logo">许愿墙管理后台</div>
    <div class="header-right">
        <el-dropdown @command="handleLogout">
            <span class="el-dropdown-link">
                {{loginData.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" >退出登录</el-dropdown-item>
                <el-dropdown-item command="update" >修改账户</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <el-dialog 
        title="修改账户"
        :visible.sync="infoUpdateVisible"
        width="40%"
    >
        <el-form :model="infoModel" :rules="rules" label-width="80px" ref="formData">
            <el-form-item prop="name" label="名字:">
                <el-input v-model="infoModel.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名:">
                <el-input v-model="infoModel.username" disabled></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码:" >
                <el-input v-model="infoModel.password"></el-input>
            </el-form-item>
            <el-row type="flex" justify="end">
                <el-col :span="4">
                    <el-button @click="handleClose">取消</el-button> 
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {update} from '@/api/login'
export default {
    name:'VHeader',
    data(){
        return{
            infoModel: {},
            rules: {
                name:[{
                    required:true,
                    message:'名字不能为空',
                },{
                    min:1,
                    max:8,
                    message:'名字在1-8个字内',
                    trigger:'change'
                }],
                password:[{
                    validator:this.passwordValidator,
                    trigger:'change',
                },{
                    required:true,
                    validator:this.passwordValidator,
                }]
            },
            infoUpdateVisible:false
        }
    },
    computed:{
        ...mapState({
            loginData: (state) => state.login.loginData
        })
    },
    created(){
        this.resetFields()
    },
    methods:{
        ...mapActions({
            setLoginData:'set_login_data'
        }),
        handleMenuW(){
            this.$bus.$emit('elapseChange')
        },
        handleLogout(command){
            switch(command){
                case 'logout': {
                    this.$router.push('/')
                    this.setLoginData({})
                    break
                }
                case 'update': {
                    this.infoUpdateVisible = true
                    break
                }
            }
        },
        handleClose(){
            this.resetFields()
        },
        handleConfirm(){
            this.$refs.formData.validate(isOk => {
                if(isOk){
                    update(this.infoModel).then(res => {
                        const {data:{data:loginData}} = res
                        this.setLoginData(loginData)
                        localStorage.setItem('loginStatus',JSON.stringify(loginData))
                    }).catch(err => {
                        this.$message({
                            type:'error',
                            message:err
                        })
                    }).finally(() => {
                        this.resetFields()
                    })
                }
            })
        },
        resetFields(){
            this.infoUpdateVisible = false
            this.infoModel = {
                name:this.loginData.name,
                username:this.loginData.username,
            }
            this.$refs.formData.resetFields()
        },
        // 校验-密码
        passwordValidator(rule, value, cb){
            console.log(rule,value,cb)
            if(!value){
                cb(new Error('密码不能为空'))
            }else if(value.length < 6 || value.length > 12){
                cb(new Error('密码为6-12位'))
            }else{
                let regExp = new RegExp(/^(?![a-zA-z]+$)(?!\d+$)(?![!@+-.#$%^&*]+$)[a-zA-Z\d!@+-.#$%^&*]+$/,'g')
                if(regExp.test(value)){
                    cb()
                }else{
                    cb(new Error('密码包含字母，数字'))
                }
            }
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
        cursor: pointer;
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