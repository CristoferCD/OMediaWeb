<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{show.name}}</p>
    </header>
    <section class="modal-card-body">
      <div class="media">
        <figure class="media-left">
          <img :src="show.imgPoster" />
        </figure>
        <div class="media-content">
          <h1>Sinopsis</h1>
          <p>{{show.sinopsis}}</p>
          <b-field label="Season" class="is-pulled-right">
            <b-select v-model="selectedSeason" @input="seasonChanged">
              <option v-for="opt in seasonIdxList" :value="opt" :key="opt">{{opt}}</option>
            </b-select>
          </b-field>
          <b-table
            :data="episodes"
            detailed
            detail-key="id"
            :show-detail-icon="true"
            :opened-detailed="defaultOpenedDetails"
          >
            <template slot-scope="props">
              <b-table-column
                field="episodeNumber"
                label="Episode"
                width="40"
              >{{props.row.episodeNumber}}</b-table-column>
              <b-table-column field="name" label="Name">{{props.row.name}}</b-table-column>
              <b-table-column field="airDate" label="Air Date">{{props.row.airDate}}</b-table-column>
              <b-table-column>
                <b-button
                  type="is-link"
                  tag="router-link"
                  :to="'/video/' + props.row.fileId"
                  :disabled="props.row.fileId === null"
                >
                  <i class="fas fa-play" />
                </b-button>
              </b-table-column>
              <b-table-column>
                <b-button type="is-link" @click="markSeen(props.row.id, !props.row.seen)">
                  <i class="far fa-eye" v-show="props.row.seen" />
                  <i class="far fa-eye-slash" v-show="!props.row.seen" />
                </b-button>
              </b-table-column>
              <b-table-column>
                <b-upload v-model="file" @input="onFileInput(props.row)">
                  <a class="button is-primary">
                    <i class="fas fa-upload" />
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <progress
                  class="progress"
                  :value="uploadProgress"
                  max="100"
                  :v-show="uploadProgress != 0"
                />
              </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
              <h1>Sinopsis</h1>
              <p>{{props.row.sinopsis}}</p>
            </template>
          </b-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import omdb from "../js/omdb";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      defaultOpenedDetails: [0],
      uploadProgress: {},
      selectedSeason: 0
    };
  },
  async created() {
    this.$store.dispatch("showDetails/initShow", {
      imdbId: this.$route.params.id
    });
  },
  computed: mapGetters("showDetails", {
    show: "getShow",
    episodes: "getEpisodes",
    seasonIdxList: "getSeasonIdxList"
  }),
  methods: {
    seasonChanged() {
      this.$store.commit("showDetails/selectSeason", {
        idx: this.selectedSeason
      });
    },
    updateProgress(evt) {
      if (evt.lengthComputable) {
        this.uploadProgress = (evt.loaded / evt.total) * 100;
      }
    },
    async markSeen(episodeId, seen) {
      await omdb.setSeen(episodeId, seen);
    }
  }
};
</script>

<style>
.modal-card {
  width: 100% !important;
  margin: auto !important;
}
.media-left {
  width: 20%;
}
.media-content h1 {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
