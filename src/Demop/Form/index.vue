<script setup lang="tsx">
import { reactive, computed } from "vue";
import { FormItem } from "../../data";
const formData = reactive({ name: "" });
const form_item_list = computed(() => [
  {
    prop: "name",
    label: "任务名称",
    render: (params) => (
      <el-input {...params} v-model={formData[params.prop]} />
    ),
  },
]);

// 导出自身数据，不然父组件无法获取
defineExpose({
  formData,
});
</script>
<template>
  <el-form :model="formData" label-width="auto">
    <FormItem :form_item_list="form_item_list"
  /></el-form>
</template>
