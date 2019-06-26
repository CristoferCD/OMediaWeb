<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <video :src="videoSrc" autoplay="true" controls="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import omdb from "../js/omdb";
export default {
  name: "VideoPlayer",
  data() {
    return {
      videoSrc: ""
    };
  },
  async created() {
    this.videoSrc = await omdb.loadVideo(this.$route.params.id);
  }
};
</script>

<style>
.hero-body {
  background-color: #4a4a4a;
}
</style>
