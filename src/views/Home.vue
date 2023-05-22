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
       class="mr-1"
        >
          Change using mutations
        </b-button>
        <b-button
        variant="primary"
        @click="changeTitleAction"
        
        >
          Change using action
        </b-button>
    </b-card>
    <b-card>
      getters Normar value::  {{ hashAdd }}
    </b-card>
    <b-card>
      call one getters to other getter:: {{ hashNewAdd }}
    </b-card>
    <b-card>
     parameter Getters:: {{newUserId('123') }}
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink, BButton,BFormGroup,BFormInput } from 'bootstrap-vue'
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters('myStore',[
    'hashAdd',
    'hashNewAdd',
    'newUserId',
  ]),
    hashAdd() {
      return this.$store.getters['myStore/hashAdd'];
    },
    hashNewAdd() {
      return this.$store.getters['myStore/hashNewAdd']
    },
    newUserId() {
      return this.$store.getters['myStore/newUserId']
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
    },
    changeTitleAction()
    {
      //1st way

      // this.$store.dispatch('myStore/newTitle',{
      //   title:this.title
      // })

      //2nd way

      this.$store.dispatch({
        type:'myStore/newTitle',
        title:this.title
      }).then((response) => {
        console.log(response);
      })
    }
  }
}
</script>

<style>

</style>
