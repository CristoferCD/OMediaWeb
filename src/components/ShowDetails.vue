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
          <b-table :data="episodes" 
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
              <b-table-column>
                <button class="button is-link" @click="loadVideo(props.row.id)">
                  <i class="fas fa-play"/>
                </button>
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
import { getEpisodes } from "../js/omdb";

export default {
  props: {
    show: {},
    episodes: []
  },
  data() {
    return {
      defaultOpenedDetails: [0]
    };
  },
  async created() {
    this.episodes = await getEpisodes(this.show.imdbId);
  },
  methods: {
    loadVideo: function(id) {
      this.$router.push("/video/"+id);
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
