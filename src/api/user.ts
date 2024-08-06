import request from "@/utils/request.ts";
import {RES} from "@/types";

export const login = <T>(data): Promise<RES<T>> => {
    return request({
        url: `/admin/user/login`,
        method: 'POST',
        data
    })

}
