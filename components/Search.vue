<template>
  <div class="container d-flex p-2 flex-column">
    <div class="col-12 flex-column">
    <form>
      <b-form-input v-model="queryName" type="text" name="find" class="mb-2" placeholder="Search you artists here" />
      <b-button variant="success" @click.prevent="getArtists">Search
      </b-button>
    </form>
  </div>
  <div class="col-12">
    <ul>
      <li v-for="artist of artists" :key="artist.id">
        <NuxtLink :to="`/${artist.id}`">
          {{ artist.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>

export default {
  name: 'MySearch',
  data () {
    return {
      queryName: '',
      token: '',
      response: {},
      artists: []
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
    },
    async getArtists () {
      const response = await this.$axios.$get(
        `/server-middleware/artists/${this.token}/${this.queryName}`
      )
      console.log('response', response.artists.items)
      this.artists = response.artists.items
    }
  }
}
</script>

<style scoped>
  @import '../assets/main.css'
</style>
