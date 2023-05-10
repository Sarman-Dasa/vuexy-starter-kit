<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1">Vuexy</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            User Registration
          </b-card-title>
          <b-card-text class="mb-2">
            Make your app management easy and fun!
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="auth-register-form mt-2">
              <!-- first_name -->
              <b-form-group label="First Name" label-for="first_name">
                <validation-provider
                  #default="{ errors }"
                  name="first_name"
                  rules="required"
                >
                  <b-form-input
                    id="first_name"
                    v-model="first_name"
                    name="first_name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="krishna"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- last_name -->
              <b-form-group label="Last Name" label-for="last_name">
                <validation-provider
                  #default="{ errors }"
                  name="last_name"
                  rules="required"
                >
                  <b-form-input
                    id="last_name"
                    v-model="last_name"
                    name="last_name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="ronaldo"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group label="Email" label-for="email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="userEmail"
                    name="email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="ronaldo@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Phone -->
              <b-form-group label="phone" label-for="phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required"
                >
                  <b-form-input
                    id="phone"
                    v-model="phone"
                    name="phone"
                    :state="errors.length > 0 ? false : null"
                    placeholder="0000000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Password">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="password1FieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePassword1Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!--confim password -->
              <b-form-group
                label-for="register-password"
                label="password_confirmation"
              >
                <validation-provider
                  #default="{ errors }"
                  name="password_confirmation"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="cpassword"
                      class="form-control-merge"
                      :type="password2FieldType"
                      :state="errors.length > 0 ? false : null"
                      name="password_confirmation"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="password2ToggleIcon"
                        class="cursor-pointer"
                        @click="togglePassword2Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                @click.prevent="validationForm"
              >
                Sign up
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{ name: 'login' }">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      first_name: "",
      last_name: "",
      userEmail: "",
      password: "",
      cpassword: "",
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      phone: "",

      // Toggle Password
      password1FieldType: "password",
      password2FieldType: "password",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    password2ToggleIcon() {
      return this.password2FieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType =
        this.password1FieldType === "password" ? "text" : "password";
    },
    togglePassword2Visibility() {
      this.password2FieldType =
        this.password2FieldType === "password" ? "text" : "password";
    },
    validationForm() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.register();
        }
      });
    },
    async register() {
      await axios
        .post("register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.userEmail,
          phone: this.phone,
          password: this.password,
          password_confirmation: this.cpassword,
        })
        .then((response) => {
          if (response.status == 200) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: response.data.message,
                icon: "EditIcon",
                variant: "error",
              },
            });
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
