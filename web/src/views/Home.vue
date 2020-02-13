<template>
  <div class="home">
    <!-- 轮播图 -->
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="@/assets/banner/banner (1).jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/banner/banner (2).jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/banner/banner (3).jpeg" alt />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style lang='scss'>
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: #fff;
    border-radius: 0.1538rem;
  }
  &.swiper-pagination-bullet-active{
    background-color: #007aff;
  }
}
</style>
