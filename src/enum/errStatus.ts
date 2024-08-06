export const errStatus = {
    400: "网络错误，请稍后重试",
    401: "登陆过期，请重新登陆",
    404: "请求地址错误",
    500: "服务器故障"

}


export const errStatusEmun = (num: number | undefined) => {
    if (!num) return "发生未知故障请联系技术人员查看"
    return errStatus[num];

}
