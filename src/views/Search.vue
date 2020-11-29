<template>
  <div class="search">
    <div class="search-box">
      <img src="../assets/images/search.jpg" height="214" width="235"/>
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
    <ul class="search-suggest" v-show="keywords !== ''" >
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
            <img src="../assets/images/search.jpg" height="214" width="235"/>
            <p>{{ value.name }}-{{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </ul>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <img src="https://images.669pic.com/element_min_new_pic/58/74/92/99/a356cff8cc6ad0818c4d6bfcfae63d8a.png" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="https://static8.depositphotos.com/1241729/873/v/950/depositphotos_8737909-stock-illustration-3d-vector-red-x-cross.jpg" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getSearchTop } from '../api'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../tools/tools'

export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          this.songs = data.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      this.searchHistory.push(this.keywords)
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    selectHot (name) {
      this.keywords = name
      this.search()
    },
    delHistory (name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name
      })
      setLocalStorage('searchHistory', this.searchHistory)
    }
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  created () {
    getSearchTop()
      .then((data) => {
        this.hots = data.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";

.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();

  .search-box {
    display: flex;
    align-items: center;
    margin: 10px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;

    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
      border-radius: 50%;
    }

    input {
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest {
    position: fixed;
    left: 0;
    right: 0;
    top: 280px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 10px 20px;
      }
    }
  }
  .search-history{
    margin-top: 20px;
    li{
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .history-left{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right{
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
