<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.picUrl" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <li v-for="(key,index) in keys"
            :key="key"
            :data-index="index"
            @touchstart.stop.prevent="touchstart"
            @touchmove.stop.prevent="touchmove"
            :class="{'active':currentIndex === index}"
        >{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  methods: {
    _keyDown (index) {
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      const index = parseInt(e.target.dataset.index)
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  created () {
    getAllArtists()
      .then((result) => {
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const proTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= proTop && -y <= nextTop) {
          this.currentIndex = i
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    overflow: hidden;
    .list-wrapper{
      .list-group{
        .group-title{
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
        }
        .group-item{
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys{
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li{
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active{
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
  }
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
