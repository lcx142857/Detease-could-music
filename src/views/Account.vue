<template>
  <transition appear>
    <div class="account">
      <Accountheader @switchItem="switchItem"></Accountheader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import Accountheader from '../components/Account/Accountheader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
  name: 'Account',
  components: {
    Accountheader,
    AccountBottom
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.account{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color()
}
.v-enter{
  transform: translate(100%);
}
.v-enter-to{
  transform: translate(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translate(0%);
}
.v-leave-to{
  transform: translate(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
