<script setup lang="ts" name="layout">
const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)
const handleClick = () => {
  // console.log("click")
  router.replace("/login")
}
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const mode = ref("1")
const drawer = ref(false)
const openSetting = () => {
  drawer.value = true
}
</script>
<template>
  <!-- 一种布局   -->
  <el-container v-if="mode === '1'" class="h-full">
    <el-aside
      :width="isCollapse ? '60px' : '210px'"
      class="bg-[#000] text-[#fff] transition-{width} delay-1000"
    >
      <div class="flex justify-center items-center h-[50px]">
        <img class="h-[30px] w-[30px]" src="@/assets/images/logo.svg" alt="" />
        <h1 class="ml-[10px] text-[20px] font-bold" :class="isCollapse ? 'hidden' : ''">
          后台管理
        </h1>
      </div>

      <el-menu
        default-active="1-3"
        class="border-none"
        :collapse="isCollapse"
        background-color="transparent"
        text-color="#fff"
        :collapse-transition="false"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="1-3">
            <el-icon><Notification /></el-icon>
            <template #title>部门管理</template>
          </el-menu-item>
          <el-menu-item index="1-4">
            <el-icon><Notification /></el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
          <el-menu-item index="1-5">
            <el-icon><Notification /></el-icon>
            <template #title>菜单管理</template>
          </el-menu-item>
          <el-menu-item index="1-6">
            <el-icon><Notification /></el-icon>
            <template #title>角色管理</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Notification /></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="2-3">
            <el-icon><Notification /></el-icon>
            <template #title>表单构建</template>
          </el-menu-item>
          <el-menu-item index="2-4">
            <el-icon><Notification /></el-icon>
            <template #title>代码生成</template>
          </el-menu-item>
          <el-menu-item index="2-5">
            <el-icon><Notification /></el-icon>
            <template #title>系统接口</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        height="50px"
        class="bg-[#000] text-[#fff] leading-[50px] flex justify-between items-center"
      >
        <el-icon @click="changeCollapse" size="20px" class="cursor-pointer">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
        <el-icon @click="handleClick" size="20px" class="cursor-pointer"><SwitchButton /></el-icon>
      </el-header>
      <el-main> hello world </el-main>
    </el-container>
  </el-container>
  <!-- 上下布局 -->
  <el-container v-else-if="mode === '2'" class="h-full">
    <el-header height="50px" class="flex items-center bg-[#ccc]">
      <div class="w-[150px] flex justify-center items-center h-[50px]">
        <img class="h-[30px] w-[30px]" src="@/assets/images/logo.svg" alt="" />
        <h1 class="ml-[10px] text-[20px] font-bold" :class="isCollapse ? 'hidden' : ''">
          后台管理
        </h1>
      </div>
      <div class="flex-1">
        <el-menu
          mode="horizontal"
          default-active="1-3"
          class="border-none"
          :collapse="isCollapse"
          background-color="transparent"
          text-color="#fff"
          :collapse-transition="false"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-3">
              <el-icon><Notification /></el-icon>
              <template #title>部门管理</template>
            </el-menu-item>
            <el-menu-item index="1-4">
              <el-icon><Notification /></el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="1-5">
              <el-icon><Notification /></el-icon>
              <template #title>菜单管理</template>
            </el-menu-item>
            <el-menu-item index="1-6">
              <el-icon><Notification /></el-icon>
              <template #title>角色管理</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Notification /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-3">
              <el-icon><Notification /></el-icon>
              <template #title>表单构建</template>
            </el-menu-item>
            <el-menu-item index="2-4">
              <el-icon><Notification /></el-icon>
              <template #title>代码生成</template>
            </el-menu-item>
            <el-menu-item index="2-5">
              <el-icon><Notification /></el-icon>
              <template #title>系统接口</template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <el-icon @click="handleClick" size="20px" class="cursor-pointer"><SwitchButton /></el-icon>
    </el-header>
    <el-main>hello world</el-main>
  </el-container>
  <!-- 第三种布局 -->
  <el-container v-else class="h-full">
    <el-header
      height="50px"
      class="bg-[#000] text-[#fff] leading-[50px] flex justify-between items-center"
    >
      <div class="flex justify-center items-center h-[50px]">
        <img class="h-[30px] w-[30px]" src="@/assets/images/logo.svg" alt="" />
        <h1 class="ml-[10px] text-[20px] font-bold" :class="isCollapse ? 'hidden' : ''">
          后台管理
        </h1>
      </div>
      <el-icon @click="changeCollapse" size="20px" class="cursor-pointer">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
      <el-icon @click="handleClick" size="20px" class="cursor-pointer"><SwitchButton /></el-icon>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1-3"
          class="border-none"
          :collapse="isCollapse"
          background-color="transparent"
          text-color="#fff"
          :collapse-transition="false"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-3">
              <el-icon><Notification /></el-icon>
              <template #title>部门管理</template>
            </el-menu-item>
            <el-menu-item index="1-4">
              <el-icon><Notification /></el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="1-5">
              <el-icon><Notification /></el-icon>
              <template #title>菜单管理</template>
            </el-menu-item>
            <el-menu-item index="1-6">
              <el-icon><Notification /></el-icon>
              <template #title>角色管理</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Notification /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-3">
              <el-icon><Notification /></el-icon>
              <template #title>表单构建</template>
            </el-menu-item>
            <el-menu-item index="2-4">
              <el-icon><Notification /></el-icon>
              <template #title>代码生成</template>
            </el-menu-item>
            <el-menu-item index="2-5">
              <el-icon><Notification /></el-icon>
              <template #title>系统接口</template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>hello world</el-main>
    </el-container>
  </el-container>
  <!-- 固定一个设置的按钮 -->
  <div
    @click="openSetting"
    class="fixed top-[45%] right-0 w-[40px] h-[40px] bg-[#409eff] flex justify-center items-center text-white cursor-pointer"
  >
    <el-icon><Setting /></el-icon>
  </div>
  <!-- 抽屉 -->
  <el-drawer v-model="drawer" :with-header="false" size="20%">
    <span>Hi there!</span>
  </el-drawer>
</template>
<style lang="scss" scoped>
:deep(.el-menu) {
  border-right: none;
}
:deep(.el-menu-item.is-active) {
  background-color: #9effe9;
}

.el-aside {
  transition: width 0.2s !important;
}
</style>
