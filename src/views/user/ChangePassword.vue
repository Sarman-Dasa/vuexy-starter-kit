<template>
  <b-card>
    <validation-observer ref="changePasswordValidation">
      <b-form  class="align-items-center">
        <b-row>
        <!-- Old Password -->
          <b-col md="4" sm="12">
            <b-form-group
              label="Old Password"
              label-for="old-password"
            >
              <validation-provider
                #default="{errors}"
                name="Old password"
                rules="required"
              >
                <b-input-group class="input-group-merge" >
                  <b-form-input
                    id="account-old-password"
                    v-model="oldPassword"
                    name="old-password"
                    :type="passwordFieldTypeOld"
                    placeholder="Old Password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIconOld"
                      class="cursor-pointer"
                      @click="togglePasswordOld"
                    />
                  </b-input-group-append>
                </b-input-group>
                <span class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
        <!-- New Password -->
        <b-col md="4" sm="12">
            <b-form-group
                label="New Password"
                label-for="new-password"
            >
            <validation-provider 
                #default="{errors}"
                name="new password"
                rules="required"
            >
            <b-input-group class="input-group-merge">
                <b-form-input 
                    id="new-password"
                    v-model="newPassword"
                    name="new-password"
                    :type="passwordFieldTypeNew"
                    placeholder="new password"
                />
                <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIconNew"
                      class="cursor-pointer"
                      @click="togglePasswordNew"
                    />

                </b-input-group-append>

            </b-input-group>
            <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            </b-form-group>
        </b-col>

        <!-- Retype Password -->
        <b-col md="4" sm="12">
            <b-form-group
                label="Retype Password"
                label-for="retype-password"
            >
            <validation-provider 
                #default="{errors}"
                name="retype password"
                rules="required"
            >
            <b-input-group class="input-group-merge">
                <b-form-input 
                    id="retype-password"
                    v-model="reTypePassword"
                    name="retype-password"
                    :type="passwordFieldTypeReType"
                    placeholder="retype password"
                />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIconRetype"
                      class="cursor-pointer"
                      @click="togglePasswordReType"
                    />

                </b-input-group-append>

            </b-input-group>
            <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            </b-form-group>
        </b-col>
        </b-row>
        <b-row>
            <b-col md="2" sm="12">
                <b-button
                variant="primary"
                block
                type="submit"
                @click.prevent="validationForm"
              >
               Change Password
              </b-button>
            </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "@validations";
import {
  BForm,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BButton,
} from "bootstrap-vue";
import axios from "axios";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BButton,
    BInputGroupAppend,
    ValidationObserver,
    ValidationProvider,
},
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reTypePassword: "",
      passwordFieldTypeOld: "password",
      passwordFieldTypeNew: "password",
      passwordFieldTypeReType: "password",
      required,
    };
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeReType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordReType() {
      this.passwordFieldTypeReType = this.passwordFieldTypeReType === 'password' ? 'text' : 'password'
    },
    validationForm() {
        this.$refs.changePasswordValidation.validate().then((success) => {
        if (success) {
          this.changePassword();
        }
      });
    },
    async changePassword() {
       //let token = JSON.parse(localStorage.getItem("userData")).accessToken
       let token = this.$store.state.app.authTokenData;
        await axios.post('change-password',{
            current_password:this.oldPassword,
            password:this.newPassword,
            password_confirmation:this.reTypePassword
        },{
          headers: {
            Authorization: `Bearer ${token}`,
        }}).then((success) => {
         this.toastMessage(success.data.message,'success');
        }).catch((error) => {
          this.toastMessage(error.response.data.message,'danger');
        });
    },
    toastMessage(message,type) {
      this.$toast({
            component: ToastificationContent,
            props: {
              title:message,
              icon: 'EditIcon',
              variant: type,
            },
          })
    }
  },
};
</script>
