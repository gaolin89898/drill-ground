<template>
  <div class="vuedragresize">
    <div class="vuedragresize_l">
      <a-form :model="form" layout="vertical" style="width: 190px">
        <a-form-item label="位置" tooltip="组件初始 x，y 位置">
          <div
            style="width: 100%; display: flex; justify-content: space-between"
          >
            <div style="width: 48%">
              <span style="font-size: 10px">top(x)</span>
              <a-input-number v-model="form.x" hide-button></a-input-number>
            </div>
            <div style="width: 48%">
              <span style="font-size: 10px">left(y)</span>
              <a-input-number v-model="form.y" hide-button></a-input-number>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="大小" tooltip="组件初始 w，h 大小">
          <div
            style="width: 100%; display: flex; justify-content: space-between"
          >
            <div style="width: 48%">
              <span style="font-size: 10px">w</span>
              <a-input-number v-model="form.w" hide-button></a-input-number>
            </div>
            <div style="width: 48%">
              <span style="font-size: 10px">h</span>
              <a-input-number v-model="form.h" hide-button></a-input-number>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="最小大小" tooltip="最小宽度，最小高度">
          <div
            style="width: 100%; display: flex; justify-content: space-between"
          >
            <div style="width: 48%">
              <span style="font-size: 10px">minw</span>
              <a-input-number v-model="form.minw" hide-button></a-input-number>
            </div>
            <div style="width: 48%">
              <span style="font-size: 10px">minh</span>
              <a-input-number v-model="form.minh" hide-button></a-input-number>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="配置" :content-flex="false">
          <a-checkbox v-model="form.isResizable">isResizable</a-checkbox>
          <a-checkbox v-model="form.isDraggable">isDraggable</a-checkbox>
          <a-checkbox v-model="form.snapToGrid">snapToGrid</a-checkbox>
          <a-checkbox v-model="form.parentLimitation">
            parentLimitation
          </a-checkbox>
        </a-form-item>
      </a-form>
    </div>
    <div class="vuedragresize_r">
      <VueDragResize
        v-for="(item, index) in data"
        :isActive="item.isActive"
        :w="item.w"
        :h="item.h"
        :isDraggable="item.isDraggable"
        :isResizable="item.isResizable"
        :parentLimitation="item.parentLimitation"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        :minw="item.minw"
        :minh="item.minh"
        :sticks="item.sticks"
        @resizing="(newRect: newRectType) => resize(newRect, item)"
        @dragging="(newRect: newRectType) => resize(newRect, item)"
        :style="{
          position: 'absolute',
          background: `${item.color}`,
        }"
        @activated="activated(item, index)"
      ></VueDragResize>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueDragResize from 'vue-drag-resize/src';
import { data, dataType, newRectType } from './index';

const form = ref<dataType>({});

const resize = (newRect: newRectType, item: dataType) => {
  form.value.w = newRect.width;
  form.value.h = newRect.height;
  form.value.x = newRect.top;
  form.value.y = newRect.left;

  item.w = newRect.width;
  item.h = newRect.height;
  item.x = newRect.top;
  item.y = newRect.left;
};

const activated = (item: dataType, index: number) => {
  activateItem(item, index);
};

function activateItem(item: dataType, index: number) {
  data.value.forEach((v, i) => {
    if (i == index) {
      v.isActive = true;
      v.sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
      form.value = item;
    } else {
      v.isActive = false;
      v.sticks = [];
    }
  });
}
</script>

<style lang="scss">
.vuedragresize {
  background: var(--color-neutral-3);
  width: 100vw;
  height: 100vh;
  display: flex;
  .vuedragresize_l {
    width: 220px;
    height: 500px;
    margin: 20px 0 20px 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vuedragresize_r {
    width: calc(100vw - 260px);
    height: calc(100vh - 40px);
    margin: 20px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
