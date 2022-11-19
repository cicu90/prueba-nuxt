<template>
  <div class="cardCont d-flex justify-content-center">
    <b-card
      :title="artist.name"
      :img-src="url"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        <b-list-group>
          <b-list-group-item><a :href="artist.external_urls.spotify">{{ artist.external_urls.spotify }}</a></b-list-group-item>
          <b-list-group-item>Popularity: {{ artist.popularity }}</b-list-group-item>
          <b-list-group-item>Followers: {{ artist.followers.total }}</b-list-group-item>
          <b-list-group-item>Genres: <span v-for="genre of artist.genres" :key="genre">{{genre}}, </span></b-list-group-item>
        </b-list-group>
      </b-card-text>
    </b-card>
  </div>

</template>

<script>
export default {
  name: 'ArtistsList',
  data () {
    return {
      token: '',
      artist: {
        name: '',
        popularity: '',
        followers: { total: '' },
        external_urls: { spotify: '' },
        genres: ''
      },
      url: ''
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.token = await this.$axios.$get('/server-middleware/login'
      )
      console.log('response', this.token)
      this.id = this.$route.params.artist

      console.log(33, 'this artists')
      this.artist = await this.$axios.$get(
        `/server-middleware/artist/${this.token}/${this.$route.params.artist}`
      )
      console.log(3, 'artists', this.artist)
      console.log(3, 'artists', this.artist.type)

      this.url = this.artist.images[0].url
    }
  }
}
</script>

<style>
.cardCont {
  background-image: url(https://images2.alphacoders.com/109/thumb-1920-1093974.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.card-img-top {
  max-width: fit-content;
}
.card-title {
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
}
</style>
