<template>
  <validation-observer ref="todoFormValidation">
    <b-form @submit.prevent>
      <b-row>
        <!-- Title -->
        <b-col md="6">
          <b-form-group label="Title" label-for="title" label-cols-md="4">
            <validation-provider #default="{ errors }" name="Title" rules="required">
              <b-form-input id="title" placeholder="Title" v-model="title" :state="errors.length > 0 ? false : null" />
              <span class="text-danger"> {{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Fill User Name in dropdown box -->
        <b-col md="6" sm="12">
          <b-form-group label="Assignee" label-for="assignee" label-cols-md="4">
            <validation-provider #default="{ errors }" name="name" rules="required">
              <v-select v-model="userName" label="title" id="name" :options="userData"
                :state="userName === '' ? false : null" />
              <!-- <select name="" id="" v-model="userName" class="form-control">
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.first_name }} {{ user.last_name }}
                </option>
              </select> -->
              <span class="text-danger"> {{ errors[0] }}</span>
              <!-- value {{ userName }} -->
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Description -->
        <b-col md="6" sm="12">
          <b-form-group label="Description" label-for="description" label-cols-md="4">
            <validation-provider #default="{ errors }" name="Description" rules="required">
              <b-form-textarea id="description" placeholder="Description" rows="3" v-model="description" no-resize
                :state="errors.length > 0 ? false : null" />
              <span class="text-danger"> {{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Due Date -->
        <b-col md="6" sm="12">
          <b-form-group label="Choose a date" for="example-datepicker" label-cols-md="4">
            <validation-provider #default="{ errors }" name="Due Date" rules="required">
              <b-form-datepicker id="example-datepicker" v-model="dueDate" class="mb-1"
                :state="errors.length > 0 ? false : null" />
              <!-- <p>Value: '{{ dueDate }}'</p> -->
              <span class="text-danger"> {{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Priority -->
        <b-col md="6" sm="12">
          <b-form-group>
            <b-col md="12">
              <b-form-group label="Priority" label-for="priority" label-cols-md="4">
                <validation-provider #default="{ errors }" name="Priority" rules="required">
                  <v-select v-model="priority" label="title" :options="option" id="priority"
                    :start="priority === null ? false : null" />
                  <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-form-group>
          <!-- <div>Selected {{ priority.title }}</div> -->
        </b-col>

        <!-- Status -->
        <b-col md="6" sm="12">
          <b-col md="12">
            <b-form-group label="Status" label-for="status" label-cols-md="4">
              <validation-provider #default="{ errors }" name="status" rules="required">
                <v-select v-model="status" label="title" :options="statusOption" id="status"
                  :state="errors.length > 0 ? false : null" />
                <span class="text-danger"> {{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-col>

        <!-- submit and reset -->
        <b-col offset-md="4" md="4" sm="12">
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1"
            @click="checkFormValidation">
            {{ isEditable ? "Update" : "Save" }}
          </b-button>
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" @click.prevent="resetForm"
            variant="outline-secondary">
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
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
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "@validations";
import { VueAutosuggest } from "vue-autosuggest";
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

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
    vSelect,
    BFormDatepicker,
    ValidationObserver,
    ValidationProvider,
    VueAutosuggest,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      priority: { title: "--none--", value: null },
      option: [
        { value: "high", title: "High" },
        { value: "low", title: "Low" },
        { value: "medium", title: "Medium" },
      ],
      status: { title: "--none--", value: null },
      statusOption: [
        { value: 1, title: "Done" },
        { value: 0, title: "UnDone" },
        { value: 2, title: "Pending" },
      ],
      dueDate: "",
      title: "",
      description: "",
      required,
      firstName: [],
      filteredOptions: [],
      limit: 10,
      selected: null,
      fullName: [],
      fullNameKey: [],
      userName: '',
      isEditable: false,
      users: [],
      //id: 0,
    };
  },
  methods: {
    // Check form validation
    checkFormValidation() {
      this.$refs.todoFormValidation.validate().then((success) => {
        if (success) {
          this.saveTodo();
        }
      });
    },

    // call create api to insert todo data
    async saveTodo() {
      let method = axios.post;
      let url = "todo/create";
      if (this.isEditable) {
        method = axios.put;
        url = `todo/update/${this.id}`;
      }
      await method(url, {
        title: this.title,
        description: this.description,
        status: this.status.value,
        priority: this.priority.value,
        due_date: this.dueDate,
        user_id: this.userName.value,
      })
        .then((success) => {
          this.toastMessage(success.data.message, "success");
          //console.log(success);
          this.resetForm();
          if(this.isEditable) {
            // Call fillTodoTable() method to show updated data in table
            this.fillTodo();
            // use when data edit using modal componet 
            // hide a modal after data update 
            this.closeModal();
            this.isEditable = false;
          }
          else
            console.log(this.$router.push("/todo"));
        })
        .catch((error) => {
          //this.toastMessage(error.response.data.message, "danger");
          let err = error.response.data.data;
          
          Object.values(err).forEach((val) => {
            this.toastMessage(val[0], "danger");
          });
         
        });
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

    //Clear form data
    resetForm() {
      if (this.id) {
        this.fillUpFormData();
      } else {
        (this.dueDate = ""), (this.title = ""), (this.description = "");
        (this.status = "--none--"), (this.priority = "--none--");
      }
    },

    // Fill up form data when edit button click
    async fillUpFormData() {
      await axios.get(`todo/get/${this.id}`).then((success) => {
        let todo = success.data.data;
        this.title = todo.title;
        this.description = todo.description;
        this.dueDate = todo.due_date;
        this.priority.title = todo.priority;
        this.priority.value = todo.priority;
        this.status.title = todo.priority === true ? "Undone" : "Done";
        this.status.value = todo.status;
        this.isEditable = true;
        this.userName = {
          title: todo.user.first_name,
          value: todo.user.id
        }
      });
    },
  },
  computed: {
    userData() {
      return this.users.map((user) => ({
        title: user.first_name,
        value: user.id,
      }));
    },
  },
  async created() {
    const pluck = (arr, key) => arr.map((i) => i[key]);
    // get login user token
    this.token = this.$store.state.app.authTokenData;

    //call user list api
    await axios
      .post("list", {}, { headers: { Authorization: `Bearer ${this.token}` } })
      .then((success) => {
        //if get only first name
        this.firstName = pluck(success.data.data.users, "first_name");
        // Get First name and last name with merge

        this.users = success.data.data.users;
        this.fullName = success.data.data.users.map(function (element) {
          return `${element.first_name} ${element.last_name}`;
        });

        // let fname = success.data.data.users.map(function (element) {
        //   return `${element.first_name} ${element.last_name}`;
        // });
        //   let id = success.data.data.users.map(function (element) {
        //   return `${element.id}`;
        // });
        // let data =[]
        // for (var i = 0; i < id.length; i++)
        //   data[id[i]] = fname[i];

        // this.fullName = data;
        // console.log();
      });
  },
  props:['id','fillTodo','closeModal'],
  mounted() {
    // when edit data form fill up base on route id 
    //this.id = this.$route.params.id;
    console.log("Edit Data Id ::",this.id);
    if (this.id > 0) {
      this.fillUpFormData();
    }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
