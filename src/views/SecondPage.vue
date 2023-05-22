<template>
  <b-card title="Create Awesome">
    <b-card-text>This is your second page.</b-card-text>
    <b-card-text>
      Data get from store <b>{{ $store.state.myStore.title }}</b>
    </b-card-text>
    <b-button
      variant="primary"
      @click="changeTitle"
      >
        Change
      </b-button>
    </b-card>
</template>

<script>
import { BCard, BCardText,BButton } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BButton
  },
  methods: {
    changeTitle() {
      //1st and 2nd way code in Home.vue file

      //3rd way pass data as object
      this.$store.commit({
        type:'myStore/setNewTitle',
        title:'set title using 3rd way'
      })
    }
  }
}
</script>

<style>

</style>
