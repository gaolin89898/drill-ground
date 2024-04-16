<template>
  <a-layout class="layout">
    <a-layout-header>
      <layoutHeader></layoutHeader>
    </a-layout-header>
    <a-layout>
      <div class="sider-layout">
        <a-layout-sider>
          <a-menu
            theme="light"
            :selected-keys="[$route.path]"
            @menu-item-click="menuClick"
          >
            <div v-for="item in menus">
              <div v-if="!item.meta?.hidden">
                <a-menu-item v-if="!item.children" :key="item.path">
                  <template #icon>
                    <Icon
                      :icon-type="item.meta?.icon as string"
                      size="15"
                      color="var(--color-text-2)"
                    />
                  </template>
                  {{ item.meta?.title }}
                </a-menu-item>
                <a-sub-menu v-else>
                  <template #icon>
                    <Icon
                      :icon-type="item.meta?.icon as string"
                      size="15"
                      color="var(--color-text-2)"
                    />
                  </template>
                  <template #title>
                    {{ item.meta?.title }}
                  </template>
                  <a-menu-item
                    v-for="v in item.children"
                    :key="v.path"
                    v-show="v.meta?.hidden"
                  >
                    <template #icon>
                      <Icon
                        :icon-type="v.meta?.icon as string"
                        size="15"
                        color="var(--color-text-2)"
                      />
                    </template>
                    {{ v.meta?.title }}
                  </a-menu-item>
                </a-sub-menu>
              </div>
            </div>
          </a-menu>
        </a-layout-sider>
      </div>
      <a-layout-content>
        <layoutContent></layoutContent>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import layoutHeader from '@/LayOut/layOutHeader/index.vue';
import layoutContent from '@/LayOut/layoutContent/index.vue';

const menus = useRouter().options.routes[0].children;
const router = useRouter();
/**
 * 菜单跳转
 * */
const menuClick = (key: string) => {
  router.push({
    path: key,
  });
};
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
