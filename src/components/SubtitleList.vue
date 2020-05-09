<template>
  <nav class="panel" style="background: white">
    <p class="panel-heading">Subtitles:</p>
    <div v-for="sub in availableSubtitles" :key="sub.url">
      <a class="panel-block" @click="getSubtitle(sub)">
        <div class="has-text-left">
          <p class="is-size-6 has-text-weight-semibold">{{sub.title}}</p>
          <p class="is-size-7">{{sub.description}}</p>
        </div>
      </a>
    </div>
    <div class="panel-block">
      <b-button class="is-fullwidth" @click="listSubtitles()">Refresh</b-button>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" />
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SubtitleList",
  computed: {
    ...mapGetters({
      availableSubtitles: "videoPlayer/getAvailableSubtitles",
      isLoading: "videoPlayer/isLoadingSubtitles"
    })
  },
  methods: mapActions("videoPlayer", ["listSubtitles", "getSubtitle"])
};
</script>

<style>
</style>