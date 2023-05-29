<template>
  <b-card>
    <b-row>
    <b-media class="mb-2">
      <template #aside>
        <b-img
          ref="previewEl"
          :src="image"
          width="100"
          v-b-tooltip.hover.v-info
          title="Click here to upload image"
          @click="uploadFile"
        />
      </template>
      <!-- user names -->
      <h4 class="mt-3 user-name">
        {{  userFullName }}
      </h4>
      <!-- file upload -->
       <b-form-file
        v-model="file"
        name="file"
        id="user-image"
        class="hidden"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="fileName"
      />
    </b-media>
    </b-row>
    <!-- User Profile  -->
    <validation-observer ref="userProfileValidation">
      <b-row>
        <!-- First Name -->
        <b-col sm="12" md="6">
          <b-form-group
            label="First Name"
            label-for="first-name"
            label-cols-md="2"
          >
            <validation-provider
              #default="{ errors }"
              name="first name"
              rules="required"
            >
              <b-form-input
                id="first-name"
                placeholder="First Name"
                :state="errors.length > 0 ? false : null"
                v-model="user.first_name"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Last Name -->
        <b-col sm="12" md="6">
          <b-form-group
            label="Last Name"
            label-for="last-name"
            label-cols-md="2"
          >
            <validation-provider
              #default="{ errors }"
              name="last name"
              rules="required"
            >
              <b-form-input
                id="last-name"
                placeholder="Last Name"
                v-model="user.last_name"
              />
              <span class="text-danger"> {{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <!-- Email -->
        <b-col sm="12" md="6">
          <b-form-group label="Email" label-for="email" label-cols-md="2">
            <validation-provider 
                #default="{errors}"
                name="email"
                rules="required|email"
            >
                <b-form-input id="email" placeholder="Email" v-model="user.email" />
                <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col sm="12" md="6">
          <b-form-group label="phone" label-for="phone" label-cols-md="2">
            <validation-provider
                #default="{errors}"
                name="phone"
                rules="required"
            >
            <b-form-input id="phone" placeholder="phone" v-model="user.phone" />
            <span class="text-danger"> {{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col  sm="12" md="6">
          <b-button type="submit" variant="success" @click="validateData">
            Save change
          </b-button>
        </b-col>
      </b-row>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BFormCheckbox,
  BCol,
  BAlert,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
  BAvatar,
  VBTooltip
} from "bootstrap-vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "@validations";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import axios from "axios";
import userData from "@/mixin/userData";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    BFormCheckbox,
    VuexyLogo,
    ValidationObserver,
    ValidationProvider,
    BAvatar,
  },
  data() {
    return {
      user:{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      userFullName:null,
      image:'',
      file:null,
      token:null,
      required,
      email,
    };
  },
  directives:{
    'b-tooltip': VBTooltip,
  },
  mixins:[userData],
  methods: {
    validateData() {
      this.$refs.userProfileValidation.validate().then((success) => {
        if (success) {
          this.updateProfile()
        }
      });
    },
    async updateProfile() {

        const obj = this.user;
        this.token = this.$store.state.app.authTokenData;
      
        const formData = new FormData();
        //working code 
        for(const [key, value] of Object.entries(obj)) {
          formData.append(key,value);
        }

        //print formData in key value 
        // for (var pair of formData.entries()) {
        //     console.log("Form Data",pair[0]+ ', ' +typeof pair[1]); 
        //}
        if(this.file)
          formData.append('file', this.file);
        formData.append('_method','PUT');
        await axios
        .post("update", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.token}`
          },
        })
        .then((success) => {
          this.toastMessage(success.data.message, "success");
          console.log(success.data.data);
          let userInfo = success.data.data;
          this.loginUserData('',userInfo)
        });
    },
    toastMessage(message, type) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: "EditIcon",
          variant: type,
        },
      });
    },
    uploadFile() {
      document.getElementById('user-image').click();
     
    },
    fileName(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    }
  },
  async mounted() {
    this.user = this.$store.state.app.userInfoData;
    this.userFullName = this.user.first_name + " " + this.user.last_name;
    this.image = process.env.VUE_APP_API_IMAGE_PATH+this.user.avtar 
    // console.log("User Info UserProfile::",this.user);
  },
};
</script>
<style scoped>
.user-name {
  border: 1px solid green;
  padding: 6px;
  background: #dff;
  width: 200px;
  text-align: center;
  border-radius: 10px;
}
</style>
