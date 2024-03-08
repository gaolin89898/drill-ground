<template>
  <a-card >
    <a-row>
      <a-col :span="12"></a-col>
      <a-col
        :span="2"
        :offset="10"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }"
      >
        <a-link href="https://github.com/gaolin89898/drill-ground">
          <icon-github :size="18" style="color: #1a1a1a" />
        </a-link>
        <a-switch style="margin: 0 16px" />
        <a-button type="text">
          <template #icon>
            <icon-fullscreen :size="18" />
          </template>
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
