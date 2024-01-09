<script setup lang="ts" name="login-page">
import { Search } from "@element-plus/icons-vue"
import { useI18n } from "@/hooks/web/useI18n"
const { t } = useI18n()
const router = useRouter()
const form = ref({
  userName: "",
  password: ""
})
const toLogin = () => {
  router.replace("/layout")
}
</script>

<template>
  <div class="h-full bg-[url('@/assets/images/login-bg7.png')] flex justify-center items-center">
    <div class="h-[420px] w-[400px] xl:w-[800px] bg-white flex">
      <div
        class="flex-1 hidden bg-[url('@/assets/images/left_img.png')] bg-no-repeat bg-center bg-80% xl:block"
      ></div>
      <div class="text-center flex-1 pt-[60px] bg-gradient-to-t from-[#003973] to-[#64b3f4]">
        <div class="mb-[10px]">
          <div></div>
          <div class="text-[#fff] text-[26px] font-bold">后台管理</div>
        </div>
        <el-form class="w-[80%] mx-auto text-center" ref="form" :model="form">
          <el-form-item prop="name">
            <el-input :prefix-icon="Search" v-model.trim="form.userName"></el-input>
          </el-form-item>
          <el-form-item prop="paw">
            <el-input :prefix-icon="Search" v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="w-[60%] mx-auto mt-[10px]" round type="primary" @click="toLogin">
              {{ t("common.login") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
  border-radius: 0px;
  border-bottom: 2px solid #fff;
}
:deep(.el-input__prefix) {
  color: #fff;
}
</style>
