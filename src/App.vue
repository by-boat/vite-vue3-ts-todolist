<script setup lang="tsx">
import { reactive, computed, ref, watchEffect, watch, nextTick } from "vue";
import { table_column_list, getDateTimeObj } from "./data";
import { ElMessage } from "element-plus";
import { useCounterStore } from "./store";
const counter = useCounterStore();
const dialogVisible = ref(false);
const childe = ref();
const todo_list: Array<Record<string, any>> = reactive([
  { name: "吃饭", done: false, time: getDateTimeObj() },
  { name: "睡觉", done: false, time: getDateTimeObj() },
  { name: "打游戏", done: false, time: getDateTimeObj() },
]);
const tableColumns = computed(() => [
  ...table_column_list,
  {
    label: "操作",
    render: ({ row }) => (
      <>
        {!row.done && (
          <el-button
            size="small"
            type="primary"
            plain
            onClick={() => {
              row.done = true;
            }}
          >
            去完成
          </el-button>
        )}

        <el-button
          size="small"
          type="danger"
          onClick={() => {
            for (let i = 0; i < todo_list.length; i++) {
              const info = todo_list[i];
              if (info.name === row.name) {
                todo_list.splice(i, 1);
                break;
              }
            }
          }}
        >
          删除
        </el-button>
      </>
    ),
  },
]);

const totle = computed(() => todo_list.length);
const dones = computed(() => todo_list.filter(({ done }) => done).length);

watchEffect(() => {
  counter.setTotle(totle.value);
  counter.setDones(dones.value);
});

function submit() {
  const val = childe.value.formData.name;
  if (val.trim()) {
    todo_list.push({
      name: val,
      done: false,
      time: getDateTimeObj(),
    });
    dialogVisible.value = false;
  } else {
    ElMessage.error("请输入正确的任务名称");
  }
}
</script>

<template>
  <div>
    <div class="top">
      <div class="title">todo MVC</div>
      <el-button class="btn" type="success" plain @click="dialogVisible = true"
        >添加待办事项</el-button
      >
    </div>
    <div class="clear"></div>
    <TableColumn :tableColumns="tableColumns" :data="todo_list" />
    <Footer />
    <el-dialog
      v-model="dialogVisible"
      title="添加待办事项"
      width="600px"
      center
    >
      <Form ref="childe" />
      <el-button type="success" @click="submit()">确定</el-button>
      <el-button type="danger" @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.top {
  margin: auto;
  margin-top: 50px;
  text-align: center;
  width: 800px;
  .title {
    font-size: 28px;
    font-weight: bold;
  }
  .btn {
    float: right;
  }
}
.box {
  width: 600px;
  height: auto;
  margin: 30px auto;
  border: 1px solid #ccc;
}
.clear {
  clear: both;
}
</style>
