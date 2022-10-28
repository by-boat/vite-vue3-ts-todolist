<script setup lang="ts">
import { useCounterStore } from "../../store";

const counter = useCounterStore();
</script>
<template>
  <div class="footer">
    <p>总待办数：<span>{{counter.totle}}</span></p>
    <p>已完成数：<span>{{counter.dones}}</span></p>
  </div>
</template>
<style scoped lang="less">
.footer {
  width: 800px;
  margin: auto;
  display: flex;
  span {
    font-size: 22px;
    font-weight: bold;
    color: pink;
  }
  p:nth-of-type(2) {
    margin-left: 25px;
  }
}
</style>
