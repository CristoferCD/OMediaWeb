<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{show.name}}</p>
    </header>
    <section class="modal-card-body">
      <div class="media">
        <figure class="media-left">
          <img :src="show.imgPoster">
        </figure>
        <div class="media-content">
          <h1>Sinopsis</h1>
          <p>{{show.sinopsis}}</p>
          <b-field label="Season" class="is-pulled-right">
            <b-select v-model="selectedSeason" @input="seasonChanged">
              <option v-for="opt in allSeasons"
                      :value="opt" :key="opt">
                {{opt}}
              </option>
            </b-select>
          </b-field>
          <b-table :data="season" 
                   detailed
                   detail-key="id"
                   :show-detail-icon="true"
                   :opened-detailed="defaultOpenedDetails">
            <template slot-scope="props">
              <b-table-column field="episodeNumber" label="Episode" width="40">
                {{props.row.episodeNumber}}
              </b-table-column>
              <b-table-column field="name" label="Name">
                {{props.row.name}}
              </b-table-column>
              <b-table-column field="airDate" label="Air Date">
                {{props.row.airDate}}
              </b-table-column>
              <b-table-column>
                <button class="button is-link" @click="loadVideo(props.row.fileId)" :disabled="props.row.fileId === null">
                  <i class="fas fa-play"/>
                </button>
              </b-table-column>
              <b-table-column>
                <button class="button is-link">
                  <i class="far fa-eye" v-show="props.row.seen"/>
                  <i class="far fa-eye-slash" v-show="!props.row.seen"/>
                </button>
              </b-table-column>
              <b-table-column>
                <b-upload v-model="file" @input="onFileInput(props.row)">
                    <a class="button is-primary">
                        <i class="fas fa-upload"/>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
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
import { getEpisodes, uploadFile } from "../js/omdb";

export default {
  props: {
    show: {},
    selectedSeason: null,
    season: [],
    allEpisodes: [],
    allSeasons: [],
    file: null
  },
  data() {
    return {
      defaultOpenedDetails: [0]
    };
  },
  async created() {
    this.allEpisodes = await getEpisodes(this.show.imdbId);
    this.allSeasons = []
    for (const ep of this.allEpisodes) {
      if(!this.allSeasons.includes(ep.season)) {
        this.allSeasons.push(ep.season)
      }
    }
    this.selectedSeason = this.allSeasons[0]
    this.seasonChanged()
  },
  methods: {
    loadVideo(id) {
      this.$router.push("/video/"+id);
    },
    onFileInput(episode) {
      uploadFile(this.file, this.show.imdbId, episode.season, episode.episodeNumber)
    },
    seasonChanged() {
      this.season = this.allEpisodes.filter(ep => ep.season === this.selectedSeason)
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
