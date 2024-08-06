
export const errorRouters = [
    {
        path: '/404',
        name: '404',
        meta: {
            isHide: true,
        },
        component: () => import('@/views/Error/error-404.vue'),
    }

]

export const notFoundRouter = {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '404',
}
