<script setup lang="ts" name="ces-table">
import type { ItableCols } from "@/interface"
import type { TableColumnCtx } from "element-plus"
const emit = defineEmits([
  "changeSize",
  "changeCurrent",
  "selectionChange",
  "rowClassName",
  "addItem"
])
const currentPage = ref(1)

// -表格合并
interface Ticket {
  name: string
  descript: string
}
interface SpanMethodProps {
  row: Ticket
  column: TableColumnCtx<Ticket>
  rowIndex: number
  columnIndex: number
}

let props = withDefaults(
  defineProps<{
    tableCols: Array<ItableCols>
    tableData: Array<any>
    total?: number
    tableHeight?: string
    isLoading?: boolean
    selection?: boolean
    rowKey?: string
    children?: string
    expand?: boolean
    sortableColumn?: string
  }>(),
  {
    selection: false,
    tableHeight: "650",
    tableData: () => [],
    rowKey: "id",
    children: "children",
    expand: false
  }
)

const handleSizeChange = (val: number) => {
  emit("changeSize", val)
}
const handleCurrentChange = (val: number) => {
  emit("changeCurrent", val)
}
/**
 * el-table-column 自适应列宽
 * @param prop_label: 表名
 * @param table_data: 表格数据
 */
const flexColumnWidth = (label: any, prop: any) => {
  // console.log("label", label, " prop", prop)
  // 1.获取该列的所有数据
  const arr = props.tableData.map((x) => x[prop])
  arr.push(label)
  return getMaxLength(arr) + 30
}
/**
 * 遍历列的所有内容，获取最宽一列的宽度
 * @param arr
 */
const getMaxLength = (arr: any) => {
  return arr.reduce((acc: any, item: any) => {
    if (item) {
      const calcLen = getTextWidth(item)
      if (acc < calcLen) {
        acc = calcLen
      }
    }
    return acc
  }, 0)
}
/**
 * 使用span标签包裹内容，然后计算span的宽度 width： px
 * @param valArr
 */
const getTextWidth = (str: any) => {
  let width = 0
  const html = document.createElement("span")
  html.innerText = str
  html.className = "getTextWidth"
  document.querySelector("body")?.appendChild(html)
  width = document.querySelector(".getTextWidth")?.offsetWidth
  document.querySelector(".getTextWidth")?.remove()
  return width
}

const multipleSelection = ref<any>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
  emit("selectionChange", val)
}

const rowClassName = ({ row }: any) => {
  if (row.ResultInfo) {
    return "highlight"
  }
}

const arraySpanMethod = ({ column, rowIndex }: SpanMethodProps) => {
  if (column.label && column.label == props.sortableColumn) {
    const _row = getSpanArr(props.tableData, column.property)[rowIndex] //column.property(穿这个是所有表头的key判断) "pro_plan"  现在是具体的某一列
    const _col = _row > 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col
    }
  }
}
// 处理合并的数据
const getSpanArr = (data: any, spanKey: any) => {
  var spanArr = []
  var pos = 0
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      spanArr.push(1)
      pos = 0
    } else {
      // 判断当前元素与上一个元素是否相同
      if (data[i][spanKey] === data[i - 1][spanKey]) {
        spanArr[pos] += 1
        spanArr.push(0)
      } else {
        spanArr.push(1)
        pos = i
      }
    }
  }
  return spanArr
}
</script>

<template>
  <!-- 表格的操作按钮 -->
  <el-row>
    <el-col :span="12">
      <slot name="btns">
        <el-button type="success" plain @click="emit('addItem')">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
      </slot>
    </el-col>
  </el-row>
  <!-- 表格组件 -->
  <div class="mt-[10px]" v-if="tableData.length != 0">
    <el-table
      :data="tableData"
      :row-key="rowKey"
      :tree-props="{ children: children }"
      border
      :max-height="tableHeight"
      :default-expand-all="expand"
      :scrollbar-always-on="true"
      :header-cell-style="{
        background: '#F7F7F7'
      }"
      :row-class-name="rowClassName"
      v-loading="isLoading"
      element-loading-text="數據加載中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
      :span-method="arraySpanMethod"
    >
      <!-- :span-method="arraySpanMethod" -->
      <el-table-column type="selection" width="55" v-if="selection" />
      <template v-for="item in tableCols">
        <el-table-column
          v-if="item.show"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed || false"
          :show-overflow-tooltip="true"
          :align="item.align ? 'item.align' : 'center'"
          :min-width="item.width ? item.width : flexColumnWidth(item.label, item.prop)"
        >
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row" :column="scope.column">
              {{ scope.row[item.prop] || "-" }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-if="true"
      v-model:current-page="currentPage"
      class="mt-[10px]"
      small
      :page-sizes="[5, 10, 15, 20]"
      background
      layout="total,sizes,prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div v-else>
    <el-empty :image-size="200" />
  </div>
</template>
