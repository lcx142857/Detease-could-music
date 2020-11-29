<template>
  <!--<div class="headerNav" @click="changeTheme">
    <div class="headerNav-left"></div>
    <p class="headerNav-title">小辰音乐</p>
    <div class="headerNav-right" @click="accountClick"></div>
  </div>-->
  <div class="headerNav" @click="changeTheme">
    <!--需用块级元素包裹插槽才能给插槽设置样式-->
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <slot name="center">中间</slot>
    <div class="right">
      <slot name="right">右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data: function () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.headerNav {
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;

  .left, .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
