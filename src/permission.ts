import {router} from "@/router";
import {config} from "@/class/RouterConfig.ts";
import {userInfo} from "@/store/user/userInfo.ts";


router.beforeEach(async (to, from, next) => {
    const userInfoStore = userInfo()
    // 1.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
    if (to.path === config.LOGIN_URL) {
        if (userInfoStore.token) return next(from.fullPath)
        return next()
    }

    // 2.判断访问页面是否在路由白名单(不需要登陆)地址中，如果存在直接放行
    if (config.ROUTER_WHITE_LIST.includes(to.path)) return next()

    // 3.判断是否有 Token，没有token跳转到登陆页面并且携带原目标路径
    if (!userInfoStore.token) {
        return next({path: config.LOGIN_URL, query: {redirect: to.fullPath}})
    }

    next()


});

router.afterEach(() => {
});
