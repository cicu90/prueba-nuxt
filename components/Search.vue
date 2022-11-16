<template>
  <div class="container">
    <form>
      <b-form-input v-model="queryName" type="text" name="find" class="mb-2" placeholder="Search you artists here" />
      <b-button @click.prevent="getArtists" variant="success">Search</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MySearch',
  data () {
    return {
      queryName: '',
      response: {},
      artists: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const response = await this.$axios.$get('/server-middleware/login'
      ).then(response => response)
      console.log('response', response)
    },
    async getArtists () {
      const response = await this.$axios.$get(`/server-middleware/artists/${this.queryName}`
      ).then(response => response)
      console.log('response', response)
    }
  }
}
</script>

<style scoped>
  @import '../assets/main.css'
</style>
