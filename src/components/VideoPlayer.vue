<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <video :src="src" autoplay="true" controls="true" @ended="loadNext()"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "VideoPlayer",
  computed: {
    ...mapGetters({
      src: "videoPlayer/getSource"
    })
  },
  methods: mapActions('videoPlayer', ['loadNext'])
};
</script>

<style>
.hero-body {
  background-color: #4a4a4a;
}
</style>
