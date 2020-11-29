export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: null
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentIndex (state) {
    return state.currentIndex
  },
  currentLyric (state) {
    return state.currentLyric
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
