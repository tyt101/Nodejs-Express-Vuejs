<template>
  <div class="side-bar">
    <el-menu class="side-bar-el-menu" :default-active="onRoutes" background-color="black" active-text-color="#ffd04b" text-color="#fff" unique-opened :collapse="isCollapse" mode="vertical" collapse-transition>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" @click="handleRouteChange(item)">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.index" :key="subItem.index" @click="handleRouteChange(item)">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index" @click="handleRouteChange(item)">
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
  </div>
</template>

<script>
export default {
    name:'SideBar',
    data(){
        return{
            // TODO：通过路由改造items信息
            items: [{
                    icon: 'el-icon-setting',
                    index: 'dashBoard',
                    title: '系统首页',
                    id:'0'
                },{
                    icon: 'el-icon-document',
                    index: 'wish',
                    title: '许愿管理',
                    id:'1'
                },{
                    icon: 'el-icon-location',
                    index: 'admin',
                    title: '管理员管理',
                    id:'2'
                },
            ],
            isCollapse:false
        }
    },
    mounted(){
        this.$bus.$on('elapseChange',() => {
            this.isCollapse = ! this.isCollapse
        })
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        },
    },
    methods:{
        handleRouteChange(item){
            this.$router.push(item.index)
            this.$bus.$emit('addTag',{
                path:'/'+item.index,
                title:item.title,
                id:item.id
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.side-bar{
    position: relative;
    height: calc(100vh - 80px);
}
.side-bar::-webkit-scrollbar{
    width: 0;
}
.side-bar-el-menu:not(.el-menu--collapse){
    width: 250px;
}
.side-bar > ul {
    height:100%;
}
</style>