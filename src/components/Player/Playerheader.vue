<template>
  <div class="headerNav">
    <div class="headerNav-left" @click="hiddenNormalPlayer"></div>
    <div class="headerNav-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="headerNav-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Playerheader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.headerNav {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;

  .headerNav-left, .headerNav-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }

  .headerNav-left {
    @include bg_img('../../assets/images/down')
  }

  .headerNav-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap()
  }
}
</style>
