<template>
  <div>
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
        <b-button
            variant="success"
            @click="countClick"
            class="float-right"
        >
        Click
        </b-button>
    </b-card>
    <b-card>
        <b-card-text class="float-right">
            Click's::   {{ click }}
        </b-card-text>
    </b-card>
  </div>
  </template>
  
  <script>
import { BCard, BCardText,BButton } from 'bootstrap-vue'
import counter from '../../mixin/counter'
export default {
  components: {
    BCard,
    BCardText,
    BButton
  },
  mixins:[counter],
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