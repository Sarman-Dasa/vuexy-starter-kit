<template>
  <b-card>
    <b-row>
      <!-- <b-col sm="3" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid src="@/assets/images/logo/logo.svg" alt="User Logo" />
        </div>
      </b-col> -->

      <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="image"
          text="avatarText(userData.fullName)"
          variant="light-primary"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{  user.first_name }}
      </h4>
       <b-form-file
        v-model="user.userImage"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="uploadFile"
      />
    </b-media>
    </b-row>
    <!-- User Profile  -->
    <validation-observer ref="userProfileValidation">
      <b-row>
        <!-- First Name -->
        <b-col cols="6">
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
        <b-col cols="6">
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
        <b-col cols="6">
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

        <b-col cols="6">
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
        <b-col cols="12">
          <!-- checkbox -->
          <b-form-group>
            <b-form-checkbox
              id="status"
              v-model="user.is_active"
              name="checkbox-1"
            >
              isActive
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
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
  BAvatar
} from "bootstrap-vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "@validations";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import axios from "axios";
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
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        is_active: false,
        userImage:'',
        image:''
      },
      token: "",
      required,
      email,
    };
  },
  methods: {
    validateData() {
      this.$refs.userProfileValidation.validate().then((success) => {
        if (success) {
          this.updateProfile()
        }
      });
    },
    async updateProfile() {
        console.log(this.user);
        await axios
        .put("update", this.user, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((success) => {
          this.toastMessage(success.data.message, "success");
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
    uploadFile(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    }
  },
  async mounted() {
    this.user = this.$store.state.app.userInfoData;
  },
};
</script>
