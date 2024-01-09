<script setup lang="ts" name="dict-page">
// 导入接口
import { getDictList } from "@/api/dict"
import { onMounted, ref, reactive } from "vue"
const tableData = ref<any>([])
const total = ref(0)
const tableCols: any[] = [
  {
    prop: "dictSort",
    label: "排序",
    width: 80
  },
  {
    prop: "dictCode",
    label: "编码",
    width: 80
  },
  {
    prop: "dictLabel",
    label: "标签"
  },

  {
    prop: "dictType",
    label: "类型"
  },
  {
    prop: "dictValue",
    label: "键值"
  },
  {
    prop: "status",
    label: "状态"
  },
  {
    prop: "remark",
    label: "備注"
  },
  {
    prop: "operate",
    label: "操作"
  }
]
onMounted(() => {
  getTableList()
})
let handleSizeChange = (size: number) => {
  console.log("size", size)
}
let handleCurrentChange = (current: number) => {
  console.log("current", current)
}
const formInline = reactive({
  user: "",
  region: ""
})

const onSubmit = () => {
  console.log("submit!")
}

const getTableList = async () => {
  let res = await getDictList()
  tableData.value = res.rows
  total.value = res.total
}

const dialogVisible = ref(false)
const openDialog = () => {
  console.log("open dialog")
  dialogVisible.value = true
}
</script>

<template>
  <div style="margin: 10px 0px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="序号">
        <el-input v-model="formInline.user" placeholder="序号" />
      </el-form-item>
      <el-form-item label="機種">
        <el-select v-model="formInline.region" placeholder="機種">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查詢</el-button>
        <el-button type="primary" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 上面的操作按钮 -->
  <el-row>
    <el-col :span="12">
      <el-button type="success" plain @click="openDialog">
        <el-icon><Plus /></el-icon>
        新增
      </el-button>
      <el-button type="success" plain>
        <el-icon><Plus /></el-icon>
        導出
      </el-button>
      <el-button type="success" plain>
        <el-icon><Plus /></el-icon>
        刪除
      </el-button>
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-button type="success" plain>
        <el-icon><Plus /></el-icon>
        新增
      </el-button>
      <el-button type="success" plain>
        <el-icon><Plus /></el-icon>
        新增
      </el-button>
    </el-col>
  </el-row>
  <!-- 表格的数据 -->
  <ces-table
    :tableData="tableData"
    :tableCols="tableCols"
    :total="total"
    @changeSize="handleSizeChange"
    @changeCurrent="handleCurrentChange"
  >
    <template #operate>
      <el-button type="danger" @click="onSubmit">刪除</el-button>
      <el-button type="primary" @click="onSubmit">重置</el-button>
    </template>
  </ces-table>
  <!-- 弹框组件 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
