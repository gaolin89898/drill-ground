<template>
  <a-layout-header>
    <a-row class="header">
      <a-col :span="12"></a-col>
      <a-col :span="2" class="header_left">
        <a-link href="https://github.com/gaolin89898/drill-ground">
          <icon-github :size="18" style="color: #1a1a1a" />
        </a-link>
        <a-switch />
        <a-button type="text">
          <template #icon>
            <icon-fullscreen :size="18" />
          </template>
        </a-button>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background: var(--color-bg-1);
  box-shadow: 0 2px 0.5px 0.5px var(--color-neutral-4);
  .header_left {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //.github {
    //  color: #1a1a1a;
    //  margin-right: 15px;
    //}
  }
}
</style>
