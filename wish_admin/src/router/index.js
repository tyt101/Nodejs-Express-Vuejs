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
                component: () => import('../views/DashBoard.vue')
            },{
                path:'/wish',
                component: () => import('../views/Wish.vue')
            },{
                path:'/admin',
                component: () => import('../views/Admin.vue')
            },
        ]
    },{
        path:'/login',
        component: () => import('../views/Login.vue')
    }]
})