<template>
  <a-layout class="layout">
    <a-layout-header>
      <layoutHeader></layoutHeader>
    </a-layout-header>
    <a-layout>
      <div class="sider-layout">
        <a-layout-sider collapsible :width="200">
          <a-menu
            mode="pop"
            theme="light"
            :selected-keys="$route.path"
            v-for="item in menus[0].children"
          >
            <a-menu-item :key="item.path">
              <template #icon>
                <icon
                  :icon-type="item.meta?.icon as string"
                  size="15"
                  color="red"
                ></icon>
              </template>
              {{ item.meta?.title }}
            </a-menu-item>
          </a-menu>
          <template #trigger="{ collapsed }">
            <icon-menu-unfold v-if="collapsed" size="23" />
            <icon-menu-fold v-else size="23" />
          </template>
        </a-layout-sider>
      </div>
      <a-layout-content>
        <layoutContent></layoutContent>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import layoutHeader from '@/LayOut/layOutHeader/index.vue';
import layoutContent from '@/LayOut/layoutContent/index.vue';

const menus = useRouter().options.routes;
onMounted(() => {
  console.log(menus);
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
:deep(.sider-layout) {
  height: calc(100vh - 67px);
  .arco-layout-sider {
    height: 100%;
  }
}
</style>
