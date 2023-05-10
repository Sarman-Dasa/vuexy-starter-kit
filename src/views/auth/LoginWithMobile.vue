<template>
    <div class="auth-wrapper auth-v2">
        <b-row class="auth-inner m-0">

            <!-- Brand logo-->
            <b-link class="brand-logo">
                <vuexy-logo />
                <h2 class="brand-text text-primary ml-1">
                    Vuexy
                </h2>
            </b-link>
            <!-- /Brand logo-->

            <!-- Left Text-->
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                    <b-img fluid :src="imgUrl" alt="Login V2" />
                </div>
            </b-col>
            <!-- /Left Text-->

            <!-- Login-->
            <b-col lg="4" class="d-block align-items-center auth-bg">
                <div class="align-items-center">
                    <b-card no-body>
                        <b-tabs card v-model="tabIndex">
                            <!-- Enter Mobile Number Tab -->
                            <b-tab title="1">
                                <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto">
                                    <b-card-title title-tag="h2" class="font-weight-bold mb-1">
                                        Enter mobile number and login
                                    </b-card-title>

                                    <!-- form -->
                                    <validation-observer ref="loginValidation">
                                        <b-form class="auth-login-form mt-2" @submit.prevent>
                                            <!-- mobile -->
                                            <b-form-group label="mobile" label-for="login-mobile">
                                                <validation-provider #default="{ errors }" name="Phone" rules="required">
                                                    <b-form-input id="login-mobile" v-model="mobile"
                                                        :state="errors.length > 0 ? false : null" name="login-mobile"
                                                        placeholder="+91 9765453423" />
                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                </validation-provider>
                                            </b-form-group>


                                            <!-- submit buttons -->
                                            <b-button type="submit" variant="primary" block @click="validationForm"
                                                :disabled="loader">
                                                Send Otp
                                            </b-button>
                                        </b-form>
                                    </validation-observer>
                                </b-col>
                            </b-tab>
                            <!-- Enter Otp Tab -->
                            <b-tab title="2" :disabled="tab">
                                <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto">
                                    <b-card-title title-tag="h2" class="font-weight-bold mb-1">
                                      We send OTP to verify your mobile number 
                                    </b-card-title>
                                    <b-card-text class="mb-2">
                                     On this number <span class="text-primary">{{ mobile }}</span>
                                    </b-card-text>
                                    <!-- form -->
                                    <validation-observer ref="otpValidation">
                                        <b-form class="auth-login-form mt-2" @submit.prevent>
                                            <!-- mobile -->
                                            <b-form-group label="OTP" label-for="login-otp">
                                                <validation-provider #default="{ errors }" name="otp" rules="required">
                                                    <b-form-input id="login-otp" v-model="otp"
                                                        :state="errors.length > 0 ? false : null" name="login-otp"
                                                        placeholder="* * * *" />
                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                </validation-provider>
                                            </b-form-group>


                                            <!-- submit buttons -->
                                            <b-button type="submit" variant="primary" block @click="validationOtpForm"
                                                :disabled="loader">
                                               Verify Otp
                                            </b-button>
                                        </b-form>
                                    </validation-observer>
                                </b-col>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
                <p class="text-center mt-2">
              <b-link :to="{name:'login'}">
                <feather-icon icon="ChevronLeftIcon" /> Back to login
              </b-link>
            </p>
            </b-col>
            <!-- /Login-->
        </b-row>
    </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
    BCard,
    BTabs,
    BTab,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
} from "bootstrap-vue";
import { required } from "@validations";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import axios from "axios";

export default {
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        BCard,
        BTabs,
        BTab,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            sideImg: require("@/assets/images/pages/login-v2.svg"),
            // validation rulesimport store from '@/store/index'
            required,
            loader: false,
            tab: true,
            mobile: '',
            tabIndex: 0,
            otp:''
        };
    },
    computed: {
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
                return this.sideImg;
            }
            return this.sideImg;
        },
    },
    methods: {
        validationForm() {
            this.$refs.loginValidation.validate().then((success) => {
                if (success) {
                    this.loginUser();
                }
            });
        },
        async loginUser() {
            this.loader = true;
            await axios
                .post(
                    "login-with-mobile",
                    {
                        phone: this.mobile,
                    })
                .then((success) => {
                    this.toastMessage(success.data.message, "success");
                    this.tab=false;
                    setTimeout(() => {
                        this.tabIndex = 1;
                    })
                    console.log(success.data);
                })
                .catch((err) => {
                    this.toastMessage(err.message, "danger");
                });
            this.loader = false;
        },
        validationOtpForm() {
            this.$refs.otpValidation.validate()
            .then((success) => {
                this.loginUserWithOtp();
            });
        },
        async loginUserWithOtp() {
            await axios
                .post(
                    "verify-otp",
                    {
                        otp: this.otp,
                    })
                .then((success) => {
                    this.toastMessage(success.data.message, "success");
                    console.log("token:",success.data.data);
                    localStorage.setItem('userData',JSON.stringify({"accessToken":success.data.data}))
                    this.$router.push('/');
                })
                .catch((err) => {
                    this.toastMessage(err.message, "danger");
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
    },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
