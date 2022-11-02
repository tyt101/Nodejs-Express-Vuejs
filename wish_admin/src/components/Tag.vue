<template>
  <div class="tag" v-if="showTags">
    <ul>
        <li class="tag-li" v-for="tag in tagsList" :key="tag.id">
            <router-link :to="tag.path">
                {{tag.title}}
            </router-link>
            <span class="tags-li-icon" @click="closeTags(tag.id)"><i class="el-icon-close"></i></span>
        </li>
    </ul>
    <div class="options">
        <el-dropdown>
            <el-button type="primary">
                标签选项<i class="el-icon-arrow-down el-icon-right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="tag in tagsList" :key="tag.id">{{tag.title}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    name:'VTage',
    data(){
        return{
            tagsList:[{
                path:'/dashBoard',
                title:'系统首页',
                id:'0'
            }]
        }
    },
    mounted(){
        this.$bus.$on('addTag',(item) => {
            if(!this.isExist(item.id)){
                this.tagsList.push(item)
            }
        })
    },
    computed:{
        showTags({tagsList}){
            return tagsList.length
        }
    },
    methods:{
        closeTags(id){
            this.tagsList = this.tagsList.filter(item => item.id !== id)
        },
        isExist(id){
            let isExist = false
            this.tagsList.forEach(item => {
                if(item.id === id)
                    isExist = true
            })
            return isExist
        }
    }
}
</script>

<style scoped lang="scss">
a{
        text-decoration: none;
        color: black;
}
.tag{
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
    height: 30px;
    line-height: 30px;
    ul{
        display: flex;
        margin-left: 10px;
        box-shadow: -5px 0 5px 0px rgba(244,244,244,.6),;
    }
    &-li{
        list-style: none;
        border-bottom-right-radius: 20px;
        margin-right: 10px;
        padding: 0 10px;
        text-align: center;
        border-radius: 5px;
        &-icon{
            display: inline-block;
            padding-right: 10px;
        }
        &:hover{
            background-color: black;
            color: white;
            a{
                color: white;
            }
        }
    }
    .options{
        margin-right: 20px;
    }
}
.el-button--primary{
    height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    background-color: rgb(52, 46, 46,.7);
}
</style>