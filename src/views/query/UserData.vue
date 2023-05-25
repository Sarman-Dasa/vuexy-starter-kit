<template>
    <div>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Name" label-for="name" label-cols-md="4">
                    <b-form-input
                    id="name"
                    v-model="name"
                    >
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group label="Email" label-for="email" label-cols-md="4">
                    <b-form-input
                    id="email"
                    v-model="email"
                    >
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button
                variant="outline-secondary"
                @click="sendData"
                >
                Send
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormTextarea,
  BFormDatepicker,
} from "bootstrap-vue";
import { email } from "vee-validate/dist/rules";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormTextarea,
    BFormDatepicker,
  },
  data() {
    return {
        name:null,
        email:null
    }
  },
  methods: {
    sendData() {
       this.$router.push({path: "/get-user-data",query:{name:this.name,email:this.email}});
    }
  }
}
</script>