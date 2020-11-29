<template >
<div class="detail">
  <Subheader :title="playlist.name"></Subheader>
  <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
  <div class="bottom">
    <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
    </ScrollView>
  </div>
</div>
</template>

<script>
import Subheader from '../components/Detail/Detailheader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getAlbum, getPlaylist, getArtistsSong, getTopList } from '../api'

export default {
  name: 'Detail',
  components: {
    Subheader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlaylist({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSong({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.list.name,
            coverImgUrl: data.list.coverImgUrl
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // 注意点：高斯模糊效果非常消耗性能，不推荐在移动端中使用
        // const scale = 20 * Math.abs(offsetY) / defaultHeight
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
