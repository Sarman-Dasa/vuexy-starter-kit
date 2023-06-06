<template>
  <div>
    <b-row>
      <b-col md="2" sm="2" class="my-1">
        <b-form-group class="mb-0"
        label-cols-sm="4"
        label="Per page"
        >
          <!-- <label 
          class="d-inline-block text-sm-left mr-50">Per page</label> -->
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-100"
          />
        </b-form-group>
      </b-col>
      <b-col md="4" sm="4" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
              class="w-75"
            >
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" sm="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="table-responsive">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
        <!-- User status -->
          <template #cell(is_active)="data">
            <b-form-checkbox
                    v-model="data.item.is_active"
                    class="custom-control-success"
                    name="check-button"
                    switch
                    @change="changeTodoStatus(data.item.is_active,data.item.id)"
                  >
                  <span class="switch-icon-left">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span class="switch-icon-right">
                    <feather-icon icon="XIcon" />
                  </span>
                </b-form-checkbox>
          </template>

          <!-- first name -->
          <template #cell(first_name)="data">
              <span v-cutome-text>
                  {{ data.value }}
              </span>
          </template>

          <!-- email -->
          <template #cell(email)="data">
              <span class="text-primary">
                  <a href="#">{{ data.value }}</a>
              </span>
          </template>

          <!-- role -->
          <template #cell(role.role)="data">
           <span v-b-modal.update-user-role @click="userId = data.item.id" v-cell-design="data.value">
            {{ data.value }}
            <feather-icon icon="RepeatIcon" class="ml-10"/>
           </span>
          </template>

          <!-- image -->
          <template #cell(image)="data">
          <b-avatar 
            size="40"
            :src="imagePath+data.value"
            variant="primary"
            badge
            class="badge-minimal"
            :badge-variant="data.item.is_active ? 'success' : 'secondary'"
          />
          </template>
         
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-modal
        id="update-user-role"
        title="Basic Modal"
        ref="user-role"
        centered
        ok-title="submit"
        @ok.prevent="changeUserRole"
        cancel-variant="outline-secondary"
      >
        <b-form>
          <b-form-group
            label="Choose the country"
            label-for="role-select"
          >
            <v-select
              id="role-select"
              v-model="selected"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="option"
            />
          </b-form-group>
        </b-form>
      </b-modal>
        </b-col>
    </b-row>
</div>
</template>

<script>
import {
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BModal, VBModal,
  BForm,
  BFormCheckbox,
} from "bootstrap-vue";
import vSelect from 'vue-select'
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BModal,
    vSelect,
    BForm,
    BFormCheckbox,
    VBModal   
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [5, 10, 25],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
      { key: "image", label:"IMAGE"},
        {
          key: "id",
          label: "Id",
        },
        { key: "first_name", label: "First Name", sortable: true },
        { key: "last_name", label: "Last Name", sortable: true },
        { key: "phone", label: "Phone", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "is_active", label: "Status", sortable: true },
        { key: "role.role", label: "Role"}
       
        // { key: "action", label:'Change Role', value:'id'}
      ],
      items: [],
      is_active: [
        {
          true: "Active",
          false: "Deactive",
        },
        {
          true: "light-success",
          false: "light-primary",
        },
      ],
      selected: '---Change Role---',
      option: [
        {label: 'Super Admin', value:1},
        {label: 'Employee', value:2},
        {label: 'HR', value:3},
      ],
      userId:null,
      imagePath:process.env.VUE_APP_API_IMAGE_PATH
    };
  },
  directives: {
    'b-modal': VBModal,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    }
  },
   mounted() {
    this.fillUserList();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async fillUserList() {
      this.token = this.$store.state.app.authTokenData;
      console.log("Token :", this.token);
      await axios
        .post("list", {}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((success) => {
          this.items = success.data.data.users;
        });
      // Set the initial number of items
      this.totalRows = this.items.length;
    },
    async changeUserRole(id) {

      await axios.put(`update-role/${this.userId}`,{
        role_id: this.selected.value,
      },{
        headers: {Authorization: `Bearer ${this.token}`}
      })
      .then((success) => {
        this.toastMessage(success.data.message,'success');
        this.$refs['user-role'].isShow=false;
        this.fillUserList();
      })
    },

    //Change user status alert dialog box open
    changeTodoStatus(status,id) {
      let message = !status ? 'Deactive' : 'Active';
        this.$swal({
        title: `Are you sure ${message} status ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: message,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.updateTodoStatus(id,status)
        } else {
          this.fillUserList();
        }
      })
    },
    
    //update user status
    async updateTodoStatus(id,status) {
      axios.put(`update-status/${id}`,{
        is_active: status ? 1 : 0
      },{
        headers: {Authorization: `Bearer ${this.token}`}
      }).then((success) => {
        if(success.data.status == 200) {
          this.fillUserList();
        }
      })
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
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>