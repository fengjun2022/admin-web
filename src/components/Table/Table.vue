<template>
  <div
    class="p-5"
    :class="{ 'bg-white': !themeConfig.isDark }"
    :style="{ width: width, height: height }"
  >
    <slot name="head">
      <div class="h-10 w-fit mb-2.5" v-if="metadata.buttons">
        <el-button
          class="mb-2"
          :style="{ marginRight: item.mr }"
          v-for="(item, index) in metadata.buttons"
          :key="index"
          :type="item.type || 'primary'"
          @click="item.callback"
        >
          {{ item.text }}
        </el-button>
      </div>
    </slot>
    <el-table
      :header-cell-style="
        !themeConfig.isDark && { background: header_bg, color: header_color }
      "
      :stripe="true"
      :border="true"
      :default-sort="sort as any"
      @selection-change="props?.selectionCallback"
      :max-height="maxHeight"
      :data="tableData"
    >
      <slot>
        <el-table-column
          align="center"
          v-if="props.isIndex"
          type="index"
          width="75"
          label="序号"
        />
        <el-table-column v-if="props.selection" type="selection" width="75" />
        <el-table-column
          :fixed="item.fixed ? item.fixed : false"
          v-for="(item, index) in metadata['metaArr']"
          :key="index"
          :label="item.label"
          :show-overflow-tooltip="true"
          :align="props.align"
          :sortable="item.sort as boolean"
          :width="item.width as number"
        >
          <template #default="scope">
            <!--              :class=" colorEmun(bt.color,bt,scope.row)"-->

            <!--            自定义插槽，动态声明，-->
            <slot :row="scope.row" v-if="item.slot" :name="item.slot"></slot>

            <div v-else class="flex justify-center place-items-center">
              <span
                class="ml-3"
                :style="{ color: !themeConfig.isDark && item.color }"
                >{{
                  (item.enum && item.enum[scope.row[item.value]]) ||
                  scope.row[item.value]
                }}</span
              >
            </div>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <div class="mt-4 flex justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[30, 50, 60, 80]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  computed,
  toRef,
} from "vue";
import { btnOption2, mateDataOptions } from "@/components/Table/type";
import { layoutRouterSetting } from "@/store/settings/layoutRouterSetting";
import { btColor } from "./enum/index";

const settingsStore = layoutRouterSetting();
const themeConfig = computed(() => settingsStore.themeConfig);

const props = withDefaults(
  defineProps<{
    maxHeight?: number;
    // 传入表格元数据
    metadata: mateDataOptions;

    dataKey?: string;
    totalKey?: string;
    isIndex?: boolean;
    // 传入表格宽度
    width?: string;
    // 传入表格高度
    height?: string;
    // 传入表格背景色
    header_bg?: string;
    // 传入表格文字颜色
    header_color?: string;
    // 插入表格对齐方式
    align?: string;
    // 排序字段传入1个对象 "{ prop: 'date', order: 'descending' }" 同时表格记得传入 sort开启排序
    sort?: object;
    // 是否有勾选框
    selection?: boolean;
    // 多选的回调
    selectionCallback?: (val) => void;
    // 传入获取数据回调 ，回调第一个应为page，第二个为size callBack需要返回total和 data数据列表
    callback: (
      currentPage,
      pageSize
    ) => Promise<{ data: object[]; total: number }>;
  }>(),
  {
    maxHeight: 500,
    width: "100%",
    height: "100%",
    header_bg: "#f4f6f8",
    header_color: "#000000",
    align: "center",
    selection: false,
    isIndex: true,
    dataKey: "records",
    totalKey: "total",
    sort: () => {
      return {};
    },
  }
);

// 当前页数
let currentPage = ref(1);
// 当前条数

let pageSize = ref(30);
//总条数
let total = ref(0);

// small
const small = ref(false);
// 是否为分页按钮添加背景色
const background = ref(true);
// 是否禁用分页
const disabled = ref(false);

let tableData = ref<object[]>([]);

const init = async () => {
  const res = await props.callback(currentPage.value, pageSize.value);

  tableData.value = res.data;
  total.value = res.total;
};

onBeforeMount(() => {
  init();
});
// 获取数据
onMounted(() => {
  // 在组件挂载后执行的代码
});

/**
 * size改变事件
 */
const handleSizeChange = async () => {
  const res = await props.callback(currentPage.value, pageSize.value);
  tableData.value = res.data;
  total.value = res.total;
};

/**
 * page改变事件
 */
const handleCurrentChange = async () => {
  const res = await props.callback(currentPage.value, pageSize.value);
  tableData.value = res.data;
  total.value = res.total;
};

onBeforeUpdate(() => {
  // 在组件更新前执行的代码
});

onUpdated(() => {});

onUnmounted(() => {
  // 在组件卸载前执行的代码
});

const fnCallback = async (
  fn: (...args) => Promise<{ data: object[]; total: number }>,
  ...args
) => {
  const res = await fn(currentPage.value, pageSize.value, ...args);
  tableData.value = res[props.dataKey];
  total.value = res[props.totalKey];
};

defineExpose({
  fnCallback,
  tableData,
  total,
});
</script>


<style scoped lang="scss">
.custom-header {
  background: #f5f7fa;
}
</style>
