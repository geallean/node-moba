<template>
  <!-- 单页应用入口文件 -->
  <div class="Main">
    <!-- 顶部 topbar -->
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center">
      <!-- http://192.168.1.101:8082/home -->
      <!-- <a href="/home" class="router-link-exact-active router-link-active">home</a> -->
      <img src="../assets/logo.png" height="30" border-radious="50%" alt />
      <div class="px-2 flex-1">
        <div class="text-white">樰婴</div>
        <div class="text-white">虔诚跳好每一支舞</div>
      </div>
      <button type="buttom" class="btn bg-primary">花兮下载</button>
    </div>
    <!-- 导航 首页 视频 相册 -->
    <div class="bg-primary py-3">
      <div class="nav d-flex text-white jc-around">
        <div class="nav-item active">
          <router-link class="nav-link active" tag="div" to="/home">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">视频</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">相册</router-link>
        </div>
      </div>
    </div>
    <!-- 页面显示 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
