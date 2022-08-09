<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 style="font-weight: bold">
      {{ isCollapse ? "后台" : "通用后台管理系统" }}
    </h3>
    <el-menu-item
      @click="
        clickMenu(item);
        changeHeader(item);
      "
      v-for="item in noChildren"
      :index="item.path + ''"
      :key="item.path"
      style="font-weight: bold"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :index="item.path + ''"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title" style="font-weight: bold">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
        style="font-weight: bold"
      >
        <el-menu-item
          @click="
            clickMenu(subItem);
            changeHeader(subItem);
          "
          :index="subIndex + ''"
          >{{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        // 跟路由模块index.js里的name:"home"匹配上，成功跳转
        name: item.name,
      });
    },
    changeHeader(item) {
      this.$store.commit("HeaderName", item.label);
    },
  },
  computed: {
    noChildren() {
      // 如果没有子项目则返回
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      // 如果有子项目则返回
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
