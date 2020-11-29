<template>
  <!--问题：swiper的bug，若数据从网络上获取，则自动轮播到最后一页之后停止轮播-->
  <!--解决：在swiper组件上面加上v-if=“数据.length > 0”-->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        loopAdditionalSlides: 3,
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin";
/*问题：若是设置了scoped属性，其样式只能在本文件中使用，无法对其它文件的样式做出修改*/
/*解决：增加style，不设置scoped属性，设置需要修改的样式*/
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    @include bg_color()
  }
}
</style>
