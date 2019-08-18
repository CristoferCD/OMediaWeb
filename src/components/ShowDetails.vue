<template>
  <div class="media">
    <figure class="media-left">
      <img :src="show.imgPoster" />
    </figure>
    <div class="media-content">
      <h1 class="is-size-3">{{show.name}}</h1>
      <p>{{show.sinopsis}}</p>
      <div class="level">
        <div class="level-left"></div>
        <b-field class="level-right" label="Season">
          <b-select v-model="selectedSeason">
            <option v-for="opt in seasonIdxList" :value="opt" :key="opt">{{opt}}</option>
          </b-select>
        </b-field>
      </div>
      <ul>
        <li class="box" v-for="ep in episodes" :key="ep.id">
          <div class="level">
            <div class="level-left">
              <p class="level-item">{{ep.episodeNumber}}</p>
              <div class="level-item">
                <div>
                  <p class="is-size-6 has-text-weight-semibold">{{ep.name}}</p>
                  <p class="is-size-7">{{ep.airDate}}</p>
                </div>
              </div>
            </div>
            <div class="level-right">
              <b-button class="level-item" @click="playEpisode(ep)" :disabled="ep.fileId === null">
                <i class="fas fa-play" />
              </b-button>
              <b-button
                :class="{ 'level-item is-light': !ep.seen, 'level-item is-success': ep.seen}"
                @click="markSeen(ep.id, !ep.seen)"
              >
                <i class="far fa-eye" v-show="ep.seen" />
                <i class="far fa-eye-slash" v-show="!ep.seen" />
              </b-button>
              <b-upload class="level-item" v-model="file" @input="uploadFile(show.imdbId, ep)">
                <a class="button">
                  <i class="fas fa-upload" />
                </a>
              </b-upload>
            </div>
          </div>
          <div class="progress-container">
            <b-progress
              class="progress"
              :value="uploadProgress[ep.id]"
              show-value
              type="is-success"
              format="percent"
              v-show="uploadProgress.hasOwnProperty(ep.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import omdb from "../js/omdb";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      file: null
    };
  },
  async created() {
    this.$store.dispatch("showDetails/initShow", {
      imdbId: this.$route.params.id
    });
    this.selectedSeason = this.seasonIdxList[this.seasonIdxList.length - 1];
  },
  computed: {
    ...mapGetters({
      show: "showDetails/getShow",
      episodes: "showDetails/getEpisodes",
      seasonIdxList: "showDetails/getSeasonIdxList",
      uploadProgress: "fileUpload/getUploadProgress"
    }),
    selectedSeason: {
      get() {
        return this.$store.getters["showDetails/getSelectedSeason"];
      },
      set(value) {
        this.$store.commit("showDetails/selectSeason", { idx: value });
      }
    }
  },
  methods: {
    seasonChanged() {
      this.$store.commit("showDetails/selectSeason", {
        idx: this.selectedSeason
      });
    },
    uploadFile(id, ep) {
      this.$store.dispatch("fileUpload/uploadFile", {
        file: this.file,
        showId: id,
        episode: ep
      });
    },
    playEpisode(ep) {
      this.$store.dispatch("videoPlayer/loadVideo", ep);
      this.$router.push("/video/" + ep.fileId);
    },
    async markSeen(episodeId, seen) {
      await omdb.setSeen(episodeId, seen);
    }
  }
};
</script>

<style>
.media {
  width: 80%;
  margin: 0 auto;
  padding: 2vw 0;
}
.media-left {
  width: 15%;
  padding: 0.8vw;
}
.media-left > img {
  box-shadow: 3px 3px 20px black;
}
.box {
  padding: 0.5vw !important;
  margin-bottom: 0.5rem !important;
}
.field > .label {
  margin: 0 10px;
}
li > .level {
  margin-bottom: 0.2rem !important;
}
</style>
