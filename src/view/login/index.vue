<template>
  <div class="login">
    <a-row>
      <a-col :span="8">
        <div class="login_left"></div>
      </a-col>
      <a-col :span="16">
        <div class="login_right"></div>
      </a-col>
    </a-row>
    <img src="/src/assets/img/Abstraction.png" alt="" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #b5dadc;
  position: relative;
  .login_right {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    border-top-left-radius: 61px;
    border-bottom-left-radius: 61px;
  }
  img{
    width: 723px;
    height: 800px;
    position: absolute;
    bottom: 0;
    left: 50px;
  }
}
</style>
