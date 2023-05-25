<template>
    <b-card title="Create Awesome">
      <b-card-text>Route Query Data Print</b-card-text>
      <b-card-text>
       Name <b>{{ name }}</b>
      </b-card-text>
      <b-card-text>
       Email <b>{{ email }}</b>
      </b-card-text>
      <b-button
        variant="primary"
        v-on:click="to=$router.go(-1)"
        >
          Back
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
  data() {
    return {
        name:null,
        email:null
    }
  },
  mounted() {
    let user =  this.$route.query;
    this.name = user.name;
    this.email = user.email;
  }
}
</script>