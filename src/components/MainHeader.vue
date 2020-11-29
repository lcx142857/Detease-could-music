<template>
  <Header class="headerNav">
    <div slot="left" class="headerNav-left"></div>
    <p slot="center" class="headerNav-title">小辰音乐</p>
    <div slot="right" class="headerNav-right" @click="accountClick"></div>
  </Header>
</template>

<script>
import Header from './Header'

export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.headerNav {
  .headerNav-left{
    @include bg_img('../assets/images/logo');
  }
  .headerNav-right {
    @include bg_img('../assets/images/account')
  }
  .headerNav-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium)
  }
}
</style>
