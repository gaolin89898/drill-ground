<template>
  <a-layout class="layout">
    <a-layout-header>
      <layoutHeader></layoutHeader>
    </a-layout-header>
    <a-layout>
      <div class="sider-layout">
        <a-layout-sider default-collapsed>
          <a-menu
            mode="pop"
            theme="light"
            :selected-keys="$route.path"
            @menu-item-click="menuClick(item)"
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
const router = useRouter();

/**
 * 菜单跳转
 * */
const menuClick = (item: any) => {
  router.push({
    path: item.path,
  });
};

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
