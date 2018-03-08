import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/projectList',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/ProjectList.vue'], resolve)
                },
                {
                    path: '/industryList',
                    component: resolve => require(['../components/page/IndustryList.vue'], resolve)   //
                },
                {
                    path: '/votingList',
                    component: resolve => require(['../components/page/VotingList.vue'], resolve)
                },
                {
                    path: '/tagManagement',
                    component: resolve => require(['../components/page/TagManagement.vue'], resolve)
                },
            ]
        },
        {
            path: '/editor',
            component: resolve => require(['../components/page/Editor.vue'],resolve)
        },
        {
            path: '/vote',
            component: resolve => require(['../components/page/Vote.vue'],resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
