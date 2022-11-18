<template>
  <div class="container">
    <form>
      <b-form-input v-model="queryName" type="text" name="find" class="mb-2" placeholder="Search you artists here" />
      <b-button variant="success" @click.prevent="getArtists">Search
      </b-button>
    </form>
    <ul>
      <li v-for="artist of artists" :key="artist.id">
        <NuxtLink :to="`/${artist.id}`">
          {{ artist.name }}
        </NuxtLink>
      </li>
    </ul>
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
