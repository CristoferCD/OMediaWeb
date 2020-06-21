<template>
  <div>
    <div class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <video :src="src" autoplay="true" controls="true" @ended="loadNext()">
            <track :label="subtitle.label" kind="subtitles" :src="subtitle.src" default />
          </video>
          <b-button v-text="Subtitles" @click="loadSubtitles()" />
        </div>
      </div>
    </div>
    <b-modal :active.sync="subtitleModalActive">
      <SubtitleList />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SubtitleList from "./SubtitleList";
export default {
  name: "VideoPlayer",
  components: {
    SubtitleList
  },
  data() {
    return {
      subtitleModalActive: false
    };
  },
  computed: {
    ...mapGetters({
      src: "videoPlayer/getSource",
      subtitle: "videoPlayer/getSubtitle"
    })
  },
  methods: {
    ...mapActions("videoPlayer", ["loadNext"]),
    loadSubtitles() {
      this.subtitleModalActive = true;
      this.$store.dispatch("videoPlayer/listSubtitles");
    }
  }
};
</script>

<style>
.hero-body {
  background-color: #4a4a4a;
}
</style>
