/**
 *   metadata.metaArr
 *   fixed:是否固定列
 *   label 列名
 *   width：宽度,
 *   name:是否是自定义列
 *   bg：表头背景色,
 *   align 排列方式,
 *   color:字体颜色
 */

export type mateDataOptions = {
  metaArr: meta[];
  buttons?: buttonMate[]
}

export type meta = {
  // 是否固定列
  fixed?: string,
  // 列名
  label: string,
  // 数据的键名
  value?: string,
  // 宽度
  width?: number | string,
  // 自定义传入插槽
  slot?: string,
  // 标头背景颜色
  bg?: string,
  // 排列方式
  align?: string,
  // 字体颜色
  color?: string,
  // 是否开启排序
  sort?: boolean,
  // 是否是按钮列
  btn?: boolean,
  // 是否有枚举属性,如果有则直接传入枚举值
  enum?: object

  // btn是true的情况下传入
  btnArr?: BtnOption[]
}


type baseBtn = {
  // 按钮颜色不传的话默认会是蓝色
  color: "blue" | "red" | "green";
  callback: <T>(row: T) => void;

}


export type BtnOption = btnOption1 | btnOption2

export type btnOption1 = baseBtn & {
  text: string
}

//如果传递一个枚举类型的按钮则，还可以使按钮在哪些字段下的颜色
export type btnOption2 = baseBtn & {
  text: { label: string, enum: object }
  colorEnum?: { "blue"?: number[], "red"?: number[], "green"?: [] }
}


/**
 * metadata.buttons:Arrar
 * position:位置
 * text：按钮文字
 * type："primary" | "success" | "warning" | "danger" | "info" | "text"
 * mr：间距
 * cabllBack:按钮回调
 *
 */
export type buttonMate = {
  // position:位置
  position?: string
  // 按钮文本
  text: string
  // 按钮类型
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text"
  // 按钮间距
  mr?: number
  // 按钮回调
  callback: (args: any) => any

}
