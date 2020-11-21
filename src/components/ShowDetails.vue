<template>
  <div id="show-detail" class="media">
    <figure class="media-left">
      <img :src="show.imgPoster" />
    </figure>
    <div class="media-content">
      <h1 class="is-size-3 has-text-left">{{show.name}}</h1>
      <p class="has-text-left">{{show.sinopsis}}</p>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-button @click="openImdb(show.imdbId)">
              <i class="fab fa-imdb" />
            </b-button>
          </div>
        </div>
        <div class="level-right">
          <b-field label="Season">
            <b-select v-model="selectedSeason">
              <option v-for="opt in seasonIdxList" :value="opt" :key="opt">{{opt}}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <ul>
        <li class="box" v-for="ep in episodes" :key="ep.id">
          <div class="columns is-vcentered">
            <div class="column is-narrow episode-number">
              <p>{{ep.episodeNumber}}</p>
            </div>
            <div class="column">
              <div>
                <p class="is-size-6 has-text-weight-semibold">{{ep.name}}</p>
                <p class="is-size-7">{{ep.airDate}}</p>
              </div>
            </div>
            <div class="column is-narrow buttons">
              <b-button @click="playEpisode(ep)" :disabled="ep.fileId === null">
                <i class="fas fa-play" />
              </b-button>
              <b-button
                :class="{ 'is-light': !ep.seen, 'is-success': ep.seen}"
                @click="markSeen(ep.id, !ep.seen)"
              >
                <i class="far fa-eye" v-show="ep.seen" />
                <i class="far fa-eye-slash" v-show="!ep.seen" />
              </b-button>
              <b-upload v-model="file" @input="uploadFile(show.imdbId, ep)">
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
        this.$store.commit("showDetails/selectSeason", value);
      }
    }
  },
  methods: {
    seasonChanged() {
      this.$store.commit("showDetails/selectSeason", this.selectedSeason);
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
      this.$store.dispatch("showDetails/setSeen", {
        episodeId: episodeId,
        seen: seen
      });
    },
    openImdb(id) {
      window.open("https:/www.imdb.com/title/" + id, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
#show-detail.media {
  width: 80%;
  margin: 0 auto;
  padding: 2vw 0;

  & > .media-left {
    width: 15%;
    padding: 0.8vw;

    & > img {
      box-shadow: 3px 3px 20px black;
    }
  }
}

.box {
  padding: 0 !important;
}
.field > .label {
  margin: 0 10px;
}
.episode-number {
  margin-left: 1.2rem;
}
</style>
