// const Mock = require('mockjs')
import Mock from "mockjs"
// import {loginForm} from "@/types/Login.ts";

const data = Mock.mock({
    token: "sakjhdaos",
    permission: 'admin'
})


Mock.mock('/user/Login', 'get', () => {
    // options: loginForm
    // console.log(options);
    // if (options?.account === "admin" && options?.passWord === "123456") {
    //
    //     return {
    //         code: 200,
    //         msg: '登录成功',
    //         result: data
    //     }
    // } else {
    //     return {
    //         code: 400,
    //         msg: '密码错误',
    //         result: null
    //     }
    // }

    return {
        code: 200,
        msg: '登录成功',
        result: data
    }
})


// console.log(data)
