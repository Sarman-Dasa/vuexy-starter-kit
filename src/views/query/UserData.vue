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
            <b-col>
                <b-button
                    variant="success"
                    @click="increment"
                >
                Click
                </b-button>
            </b-col>
        </b-row>
        <b-card>
            <b-card-text>
              Click's::   {{ click }}
            </b-card-text>
        </b-card>
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
  BCard,
  BCardText,
} from "bootstrap-vue";
import { email } from "vee-validate/dist/rules";
import counter from '../../mixin/counter'
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
    BCard,
    BCardText
  },
  mixins:[counter],
  data() {
    return {
        name:null,
        email:null,
        click:0
    }
  },
  methods: {
    sendData() {
       this.$router.push({path: "/get-user-data",query:{name:this.name,email:this.email}});
    },
    increment () {
        //mixin method use
        this.countClick()
    }
  }
}
</script>