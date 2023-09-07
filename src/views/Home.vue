<template>
  <div>
    <el-container class="container">
      <!-- 菜单区域 -->
      <el-aside width="auto">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-menu-item
            :index="item.id"
            v-for="item in noChildren"
            :key="item.path"
            @click="goSkip(item.path)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu
            :index="item.id"
            v-for="(item, index) in hasChildren"
            :key="index"
          >
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{ item.meta.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="subItem.id"
                v-for="(subItem, subIndex) in item.children"
                :key="subIndex"
                @click="goSkip(subItem.path)"
              >
                <i :class="subItem.meta.icon"></i>
                <span slot="title">{{ subItem.meta.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部导航 -->
        <el-header>
          <div class="cell-wrapper" @click="collapseMenu">
            <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </div>
          <!-- 展示用户信息 -->
          <div class="userInfoClass">
            <i class="el-icon-user-solid"></i>
            {{ this.userInfo }}
          </div>
          <el-button size="small" @click="signOut">退出</el-button>
        </el-header>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuData from '../components/menuData.js' // 菜单数据
export default {
  data() {
    return {
      menuData: [], // 菜单列表
      isCollapse: false, // 是否折叠
      userInfo: '' // 用户信息
    }
  },
  created() {
    console.log(menuData)
    this.menuData = menuData
    this.getUserInfo() // 用户信息
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    }
  },
  methods: {
    // 退出按钮
    signOut() {
      sessionStorage.clear() // 退出后 清空本地缓存
      this.$router.push('/login') // 跳转页面
    },
    // 跳转页面
    goSkip(path) {
      this.$router.push(path)
    },
    // 控制左侧导航栏开启/关闭事件
    collapseMenu() {
      this.isCollapse = !this.isCollapse
    },
    // 获取用户信息
    getUserInfo() {
      this.$api.getLoginApi.getLoginUserInfo().then((res) => {
        console.log('当前用户', res)
        this.userInfo = res.data.nickname
      })
    }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0;
  height: 100vh;
  // width: 100%;
}
// 头部导航
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
// 菜单区域
.el-aside {
  width: 200px;
  height: 100%;
  // background: #000;
  overflow: hidden;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    border: none;
  }
}
.el-menu {
  // width: 200px;
  height: 100%;
}
// 内容区域
.el-main {
  margin: 0;
  padding: 0;
  background: #f8fafd;
}
// icon图标
.cell-wrapper {
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}
// 用户信息样式
.userInfoClass {
  margin-right: 20px;
  font-size: 16px;
  flex: 1;
  text-align: right;
  color: #fff;
}
</style>
