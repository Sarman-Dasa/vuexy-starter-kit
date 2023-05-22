<template>
  <div>
    <b-card title="State managment">
      <b-card-text>
      Data get from store <b>{{ $store.state.myStore.title }}</b>
      </b-card-text>
      <b-form-group>
        <b-form-input
          lable="Add Title"
          label-cols-md="2"
          v-model="title"
        >

        </b-form-input>
      </b-form-group>
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
import { BCard, BCardText, BLink, BButton,BFormGroup,BFormInput } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BButton,
    BFormGroup,
    BFormInput
  },
  data() {
    return {
      title:'',
    }
  },
  methods: {
    changeTitle() {
      
      // basic syntax
      //this.$store.commit('setNewTitle','new title');

      //if using namespaced modules ensure you prefix the module e.g. this.$store.commit('moduleName/myMutation');
      //1st way
      //this.$store.commit('myStore/setNewTitle','new title');

      //2nd way pass data as object
      this.$store.commit('myStore/setNewTitle',{
        title:this.title
      })
      this.title = '';
    }
  }
}
</script>

<style>

</style>
