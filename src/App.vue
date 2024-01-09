<script name="app" setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
</script>
<template>
  <router-view v-slot="{ Component }">
    <el-config-provider :locale="zhCn">
      <component :is="Component"></component>
    </el-config-provider>
  </router-view>
</template>
