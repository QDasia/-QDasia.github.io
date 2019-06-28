import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    // mode: 'history',
    mode:'hash',
    routes: [
        //错误页面重定向到404页面
        {path: "*", redirect: "404"},
        {
            path: "/404",
            component: require('../www/page/help/404.vue'),
        },
        {
            path: "/404",
            component: require('../www/page/help/404.vue'),
        },
        //重定向
        {path: '/', redirect: '/index'},
        {
            path: '/',
            component: require('../www/common/home.vue'),
            children: [
                {
                    path: '/index',//首页
                    component: require('../www/page/home/index.vue'),
                },
            ]
        },
    ]
})