<script setup lang="ts" name="not-found">
const router = useRouter()
import imgUrl from "@img/404.png"
</script>
<template>
  <div class="h-[100vh] w-[100vw] bg-[#000c2f] flex justify-center items-center text-center">
    <div class="flex flex-col justify-center items-center">
      <el-image class="w-[500px] mb-[50px]" :src="imgUrl" fit="cover"></el-image>
      <el-button class="w-[300px] bg-[#144646]" type="success" @click="router.go(-1)" plain>
        {{ $t("fanHui") }}
      </el-button>
    </div>
  </div>
</template>
