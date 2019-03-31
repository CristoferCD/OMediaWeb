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
          <button @click="loadVideo"/>
          <b-table :data="episodes" :columns="columns"/>
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
      columns: [
        {
          field: "episodeNumber",
          label: "Episode",
          width: "40"
        },
        {
          field: "name",
          label: "Name"
        },
        {
          field: "sinopsis",
          label: "Sinopsis"
        }
      ]
    };
  },
  async created() {
    this.episodes = await getEpisodes(this.show.imdbId);
  },
  methods: {
    loadVideo: function() {
      this.$router.push('/video/1')
    }
  }
};
</script>

<style>
.modal-card {
  width: 80%;
  margin: auto;
}
.media-left {
  width: 20%;
}
.media-content h1 {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
