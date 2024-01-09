<script setup lang="ts">
import * as echarts from "echarts"
const chartRef = ref()
let myChart: echarts.ECharts
let props = defineProps({
  chartId: {
    type: String,
    default: "chartId"
  },
  loading: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "300px"
  },
  options: {
    type: Object,
    required: true
  }
})
onMounted(() => {
  // initChart()
  nextTick(() => {
    initChart()
  })
})
// 初始化表格
const initChart = (): void => {
  myChart = echarts.init(chartRef.value as HTMLDivElement, { render: "svg" })
  // 展示一个loading 动画
  myChart.showLoading({
    text: "",
    color: "#409eff",
    textColor: "#000",
    maskColor: "#fff",
    zlevel: 0,
    lineWidth: 2
  })
  if (!props.loading) {
    myChart.hideLoading()
    myChart.setOption(props.options, true)
  }
}
onBeforeUnmount(() => {
  myChart && myChart.dispose()
})
watch(
  () => props.options,
  () => {
    console.log("watch===", props.options)
    myChart.setOption(props.options, true)
  },
  { deep: true }
)
</script>
<template>
  <div :id="chartId" ref="chartRef" :style="{ height, width }"></div>
</template>
