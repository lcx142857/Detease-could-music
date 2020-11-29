<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListitem :songs="switchNum === 0 ? favoriteList:historyList"></SongListitem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../ScrollView'
import SongListitem from '../SongListitem'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListitem
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    selectAllMusic () {
      if (this.switchNum === 0) {
        this.SET_SONG_DETAIL(this.favoriteList)
      } else {
        this.SET_SONG_DETAIL(this.historyList)
      }
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;

  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include bg_color();
    border-radius: 30px;

    span {
      display: inline-block;

      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }

  .bottom-wrapper {
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
