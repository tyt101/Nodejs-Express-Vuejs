import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/',
        component: () => import('../components/Home.vue'),
        children:[{
                path:'/dashboard',
                component: () => import('../views/DashBoard.vue'),
                meta:{
                    icon:'el-icon-setting',
                    name:'系统首页',
                }
            },{
                path:'/wish',
                component: () => import('../views/Wish.vue'),
                meta:{
                    icon:'el-icon-document',
                    name:'许愿管理',
                }
            },{
                path:'/admin',
                component: () => import('../views/Admin.vue'),
                meta:{
                    icon:'el-icon-location',
                    name:'管理员管理'
                }
            },
        ]
    },{
        path:'/login',
        component: () => import('../views/Login.vue')
    }]
})