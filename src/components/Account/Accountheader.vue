<template>
  <Header class="headerNav">
    <div slot="left" class="headerNav-left" @click.stop="back"></div>
    <ul slot="center" class="headerNav-title">
      <li :class="{'active':switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{'active':switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="headerNav-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'Accountheader',
  data: function () {
    return {
      switchNum: 0
    }
  },
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.headerNav {
  .headerNav-left {
    @include bg_img('../../assets/images/back')
  }

  .headerNav-right {
    @include bg_img('../../assets/images/more')
  }

  .headerNav-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 15px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
