<template>

  <div>
<!--    <Table :callback="getData"-->
<!--           :metadata="mate"-->
<!--           :selection="true"-->
<!--           :maxHeight="450"-->
<!--           :sort="[-->
<!--             { prop: 'createTime', order: 'descending' },-->
<!--             { prop: 'updateTime', order: 'descending' }]">-->


<!--    </Table>-->
  </div>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, ref} from 'vue';
import {mateDataOptions} from "@/components/Table/type";





// 生命周期钩子
onBeforeMount(() => {
  // 在组件挂载前执行的代码
});

onMounted(() => {
  // 在组件挂载后执行的代码
});

onBeforeUpdate(() => {
  // 在组件更新前执行的代码
});

onUpdated(() => {
  // 在组件更新后执行的代码
});

onUnmounted(() => {
  // 在组件卸载前执行的代码
});

// 侦听器



/**
 * 这只是一个接口调用使用案例
 */

// interface a {
//   name: string
//   passWord: string
// }

// let get = async () => {
//   const ab = await user<a>()
//   ab.result.passWord
// }
// get()

// 表格元数据配置
const mate = ref<mateDataOptions>({
  metaArr: [
    {label: "日期", value: "date"},
    {label: "设备编号", value: "name"},
    {label: "设备名称", value: "address"},

  ],
  // buttons: [
  //   {
  //     callback: staAdd,
  //     text: "添加STA设备"
  //   },
  //   {
  //     text: "批量导入",
  //     callback: bulkImport
  //   },
  //   {
  //     text: "导出数据",
  //     callback: downloadData
  //   },
  //   // {
  //   //   text: "批量导出",
  //   //   callback: bulkExport
  //   // },
  //   // {
  //   //   text: "批量申请凭证",
  //   //   callback: applyForVoucher
  //   // },
  // ]
});
const getData = (currentPage, pageSize) => {
  console.log(currentPage,pageSize)
  return Promise.resolve({data:ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]),total:10})
}

</script>


<style scoped>

</style>
