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
        children:[
            {
                path:'/dashboard',
                component: () => import('../components/DashBoard.vue')
            }
        ]
    },{
        path:'/login',
        component: () => import('../views/Login.vue')
    }]
})