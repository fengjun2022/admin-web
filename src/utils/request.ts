import axios, {AxiosResponse} from 'axios'
import type {AxiosError} from 'axios'
import {ElMessage} from 'element-plus'
import {userInfo} from "@/store/user/userInfo.ts";
import {getTimeStamp} from "@/utils/time.ts";
import {RES} from "@/types";
import {errStatus, errStatusEmun} from "@/enum/errStatus.ts";
import {useLoading} from "@/hooks/useLoading.ts";


const service = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT, // url = base url + request url
    timeout: 120000, // request timeout
})

const user = userInfo()
const {isHide} = useLoading()


const timeOut = 8

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (user.token !== "") {
            // 主动检测 判断token是否过期过期-现在大于1小时则过期
            if ((+new Date() - getTimeStamp()) / 1000 > 3600 * timeOut) {

                return Promise.reject(new Error('登录超时'))
            }
            // config.headers['Authorization']
        }

        // 必须要返回的
        return config
    },
    error => {
        console.log(error) // for debug
        isHide()
        return Promise.reject(error)
    },
)

// 响应拦截器

service.interceptors.response.use(
    async <T>(response: AxiosResponse<Promise<T>>) => {
        const result: RES<T> = await response.data as RES<T>;
        console.log(result.code)
        isHide()
        if (result.code === 200) {
            return Promise.resolve(response.data)
        } else {
            result.msg !== "" ? ElMessage.error(result.msg) : ElMessage.error(errStatus[result.code])
            throw new Error(result.msg)
        }
    },
    (error: AxiosError) => {

        isHide()

        // 处理 HTTP 网络错误
        let message = ''
        // HTTP 状态码
        console.log(error)
        const status = error.response?.status
        message = errStatusEmun(status)

        ElMessage({
            message: message,
            type: 'error',
        })
        return Promise.reject(error)
    },
)


export default service


