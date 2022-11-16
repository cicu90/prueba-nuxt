<template>
  <search/>
</template>

<script>
import Search from "~/components/Search.vue"
export default {
  name: 'IndexPage',
  components: {
    Search,
  },
  data () {
    return {
      name: '',
      pageSize: 20
    }
  },
}
</script>
