import Vue from 'vue'
import axios from 'axios'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
const myMixin = Vue.mixin({
   methods: {
    // post method
    async getHTTPPostResponse(url, input=[], success_message = false) {
        if(this.$store.state.app.authTokenData) {
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.app.authTokenData;
           //axios.defaults.headers.common['authToken'] = 'Bearer ' + this.$store.state.app.authTokenData;
           const data = await axios.post(url,input)
           .then(response => {
            let data = response.data;
            if(success_message) {
                this.toastMessage(data.message,'success');
            }
            return data;
           }).catch(err => {
            let data = err.response.data;
            // console.log("Mixin File::");
            this.toastMessage(data.message,'danger');
           });
           return data;
        }
    },
    //put method
    async getHTTPPutResponse(url,input=[],success_message = false) {
        if(this.$store.state.app.authTokenData) {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.$store.state.app.authTokenData;

            const data = await axios.put(url,input)
            .then(response => {
                let data = response.data;
                if(success_message) {
                    this.toastMessage(data.message,'success');
                }
                return data;
            }).catch(err => {
                let data = err.response.data;
                this.toastMessage(data.message,'danger');
            });
            return data;
        }
    },
    //delete method
    async getHTTPDeleteResponse(url, input=[],success_message = false){
        if(this.$store.state.app.authTokenData) {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.app.authTokenData;

            const data = await axios.delete(url)
            .then(response => {
                let data = response.data;
                if(success_message) {
                    this.toastMessage(data.message,'success');
                }
                return data;
            }).catch(err => {
                let data = err.response.data;
                this.toastMessage(data.message,'danger');
            });

            return data;
        }
    },
    //get method
    async getHTTPGetResponse(url, input=[],success_message = false) {
        if(this.$store.state.app.authTokenData) {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.app.authTokenData;

            const data = await axios.get(url)
            .then(response => {
                let data = response.data;
                if(success_message) {
                    this.toastMessage(data.message,'success');
                }
                return data;
            }).catch((err) => {
                let data = err.response.data;
                this.toastMessage(data.message, 'danger');
            });

            return data;
        }
    },
    // toast message for comman use
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
   }
})