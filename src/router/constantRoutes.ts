import {config} from "@/class/RouterConfig.ts"

const LAYOUT = () => import('@/layouts/index.vue')
export default [
    {
        path: '/',
        name: 'Home',
        component: LAYOUT,
        redirect: config.HOME_URL,
        meta: {
            title: '首页',
            icon: 'HomeFilled',
        },
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    affix: true,
                    activeMenu: "/index"
                },
            },
        ],

    },



    {
        name: 'System',
        path: '/System',
        component: LAYOUT,
        redirect: '/System/user',
        meta: {
            title: '系统管理',
            icon: 'Setting',
        },
        children: [
            {
                name: 'SystemIndex',
                path: '/system/user',
                component: () => import('@/views/System/UserView/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled',
                },
            },



            {
                name: 'SystemSystem',
                path: '/System/System ',
                component: () => import('@/views/System/SystemView/index.vue'),
                meta: {
                    title: '系统设置',
                    icon: 'Setting',

                },
            },

        ],
    },


];


