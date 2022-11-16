<template>
  <div>
    <form>
      <input v-model="queryName" type="text" name="find" placeholder="Search you artists here" />
      <button @click.prevent="getArtists">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MySearch',
  data () {
    return {
      queryName: '',
      todoId: 1,
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
