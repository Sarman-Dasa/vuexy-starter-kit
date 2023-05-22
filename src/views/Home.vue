<template>
  <div>
    <b-card title="State managment">
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
  </div>
</template>

<script>
import { BCard, BCardText, BLink, BButton } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BButton,
  },
  methods: {
    changeTitle() {
      
      // basic syntax
      //this.$store.commit('setNewTitle','new title');

      //if using namespaced modules ensure you prefix the module e.g. this.$store.commit('moduleName/myMutation');
      //1st way
      this.$store.commit('myStore/setNewTitle','new title');

      //2nd way pass data as object
      this.$store.commit('myStore/setNewTitle',{
        title:'set title using object type data'
      })
    }
  }
}
</script>

<style>

</style>
