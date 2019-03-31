<template>
    <div>
        <p> Loading video with id {{this.$route.params.id}} </p>
        <video :src="videoSrc"/>
    </div>
</template>

<script>
import { loadVideo } from "../js/omdb";
export default {
    name: "VideoPlayer",
    data() {
        return {
            videoSrc: ""
        }
    },
    async created() {
        this.videoSrc = await loadVideo(this.$route.params.id)
    }
}
</script>

<style>

</style>
