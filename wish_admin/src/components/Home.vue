<template>
  <div class="home">
    <vHeader></vHeader>
    <div class="flex">
      <SideBar></SideBar>
      <div class="flex-content">
        <vTag></vTag>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name:'MyHome',
    components:{
      vHeader : () => import('./Header.vue'),
      SideBar : () => import('./SideBar.vue'),
      vTag: () => import('./Tag.vue')
    }
}
</script>

<style lang="scss" scoped>

.flex{
  display: flex;
  &-content{
    flex: 1;
    background-color: #f4f4f4;
  }
}
</style>