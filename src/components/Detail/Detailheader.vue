<template>
<Header class="headerNav">
  <div slot="left" class="headerNav-left" @click.stop="back"></div>
  <p slot="center" class="headerNav-title">{{ title }}</p>
  <div slot="right" class="headerNav-right"></div>
</Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'Subheader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.headerNav {
  .headerNav-left{
    @include bg_img('../../assets/images/back')
  }
  .headerNav-right{
    @include bg_img('../../assets/images/more')
  }
  .headerNav-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap()
  }
}
</style>
