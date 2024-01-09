<script setup lang="ts" name="search-page">
import type { FormInstance } from "element-plus"
const searchFormRef = ref<FormInstance>()
let props = defineProps(["formConfig"])
const emit = defineEmits(["searchClick", "resetClick"])
// 创建表单数据
const initialForm: any = {}
for (const item of props.formConfig.formItems) {
  initialForm[item["prop"]] = item["initialValue"] ?? ""
}
const searchForm = reactive(initialForm)
const handleSearchClick = () => {
  emit("searchClick", searchForm)
}
const handleResetClick = () => {
  searchFormRef.value?.resetFields()
  emit("searchClick", searchForm)
}
</script>

<template>
  <el-form inline :model="searchForm" ref="searchFormRef">
    <template v-for="(item, index) in formConfig.formItems" :key="index">
      <el-form-item :label="item.label" :prop="item.prop">
        <template v-if="item.type == 'input'">
          <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
        </template>
        <template v-else-if="item.type == 'select'">
          <el-select
            v-model="searchForm[item.prop]"
            @change="item.changeClick"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-else-if="item.type == 'daterange'">
          <el-date-picker
            v-model="searchForm[item.prop]"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </template>
        <template v-else-if="item.type == 'datetime'">
          <el-date-picker
            v-model="searchForm[item.prop]"
            type="datetime"
            :placeholder="item.placeholder"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY/MM/DD hh:mm:ss"
          />
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" icon="Search" @click="handleSearchClick">搜索</el-button>
      <el-button type="success" icon="RefreshLeft" @click="handleResetClick">重置</el-button>
    </el-form-item>
  </el-form>
</template>
