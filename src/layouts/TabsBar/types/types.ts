/*
 * @Description:
 * @Autor: codeBo
 * @Date: 2023-03-03 17:38:42
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-03 18:08:31
 */
import {RouteMeta, RouteRecordRaw} from 'vue-router'

export type routersType = RouteRecordRaw & {
  title?: string
}
export interface tagsType {
  fullPath:string,
  path:string,
  name:string,
  meta: RouteMeta
}
