<template>
  <div id="app">
    <headerNav></headerNav>
    <Tabbar></Tabbar>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import headerNav from './components/MainHeader'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    headerNav,
    Tabbar,
    Player
  }
}
</script>
<style scoped>
</style>
