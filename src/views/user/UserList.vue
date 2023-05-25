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
          <template #cell(is_active)="data">
            <b-badge :variant="is_active[1][data.value]">
              {{ is_active[0][data.value] }}
            </b-badge>
          </template>
          
          <template #cell(first_name)="data">
              <span v-cutome-text>
                  {{ data.value }}
              </span>
          </template>

          <template #cell(email)="data">
              <span class="text-primary">
                  <a href="#">{{ data.value }}</a>
              </span>
          </template>

          <template #cell(role.role)="data">
           <span v-b-modal.update-user-role @click="userId = data.item.id" v-cell-design="data.value">
            {{ data.value }}
            <feather-icon icon="RepeatIcon" class="ml-10"/>
           </span>
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
  BForm
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
    BForm
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
        {
          key: "id",
          label: "Id",
        },
        { key: "first_name", label: "First Name", sortable: true },
        { key: "last_name", label: "Last Name", sortable: true },
        { key: "phone", label: "Phone", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "is_active", label: "Status", sortable: true },
        { key: "role.role", label: 'Role'},
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
      userId:null
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