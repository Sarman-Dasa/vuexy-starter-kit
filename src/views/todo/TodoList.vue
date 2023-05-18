<template>
  <div>
    <b-row>
      <!-- Per Page -->
      <b-col md="2" sm="4" class="my-1">
        <b-form-group class="mb-0"
        label="Per Page"
        label-cols-sm="4"
        >
          <!-- <label class="d-inline-block text-sm-left mr-4">Per page</label> -->
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-100"
          />
        </b-form-group>
      </b-col>

      <!-- sort -->
      <b-col md="4" sm="8" class="my-1">
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

      <!-- search  -->
      <b-col md="4" class="my-1">
        <b-form-group
        v-show="searchDisabled"
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

      <!-- Export -->
      <b-col sm="2" class="my-1">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          block
          @click="exportData"
        >
          Export
        </b-button>
      </b-col>

      <!-- range -->
      <b-col sm="3" class="my-1 float-right">
        <b-form-group
          label="Date Range"
          label-cols-sm="3"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"  
        >
        <b-input-group size="sm">
          <flat-pickr
            v-model="datefilter"
            class="form-control"
            :config="{ mode: 'range'}"
          />
          <b-input-group-append>
              <b-button :disabled="!datefilter" @click="clearDateFilter">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Table  -->
    <b-row>
      <b-col class="table-responsive">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="resultQuery"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <!-- status column  -->
          <template #cell(status)="data">
            <b-badge :variant="status[1][data.value]">
              {{ status[0][data.value] }}
            </b-badge>
          </template>

          <!-- Priority column -->
          <template #cell(priority)="data">
            <b-badge :variant="priority[1][data.value]">
              {{ priority[0][data.value] }}
            </b-badge>
          </template>

          <!-- Due Date Column -->
          <template #cell(due_date)="data">
            <b-badge
              :variant="data.value == today ? 'light-danger' : 'light-success'"
            >
              {{ data.value }}
            </b-badge>
          </template>

          <!-- Action Column -->
          <template #cell(action)="data">
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item>
                <span v-b-modal.updateTodoModal @click="editData(data.item.id)">
                <feather-icon icon="Edit2Icon" class="mr-50" />
                    Edit
                </span>
                <!-- <b-link :to="{ name: 'todo-edit', params:{id:data.item.id}}"  v-b-modal.modal-select2>edit</b-link> -->
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span @click="deleteData(data.item.id)">Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>

          <!-- User image -->
          <template #cell(avatar)="data">
            <b-avatar
              variant="primary"
              :text="data.item.user.first_name[0] + data.item.user.last_name[0]"
            ></b-avatar>
          </template>

        </b-table>
      </b-col>
    </b-row>
     <!-- Pagination -->
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
    <!-- modal -->
    <b-row>
      <b-col cols="12" v-if="isModalDisplay">
        <b-modal
          id="updateTodoModal"
          title="Update Todo"
          size="lg"
          centered
          ok-title="cancel"
          ok-variant="danger"
          header-bg-variant="info"
          header-text-variant="dark"
          body-bg-variant="light"
          body-text-variant="dark"
          :show-ok="false"
          footer-bg-variant="info"
          cancel-variant="outline-secondary"
          ok-only
          @ok.prevent="closeModal()"
        >
          <AddTodoTask :id="editId" :fillTodo="fillTodoTable" :closeModal="closeModal"/>
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
  BDropdown,
  BDropdownItem,
  BModal, VBModal,
  BLink
} from "bootstrap-vue";
import axios from "axios";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import flatPickr from 'vue-flatpickr-component'
// import addTodo from './AddTodoTask.vue'
import AddTodoTask from "./AddTodoTask.vue";
// import AddTodoTask from "./AddTodoTask.vue";
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
    BDropdown,
    BDropdownItem,
    BLink,
    flatPickr,
    AddTodoTask,
    BModal, 
    VBModal,
},
  directives: {
    Ripple,
    'b-modal': VBModal,
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
      filter:null,
      range:null,
      filterOn: [],
      fields: [
        {
          key: "id",
          label: "Id",
        },
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "priority", label: "Priority", sortable: true },
        { key: "due_date", label: "Due Date", sortable: true },
        { key: "user.first_name", label: "User", sortable: true },
        { key: "avatar", label: "Image" },
        { key: "action", label: "Action", value: "id" },
        //   { key: "is_active", label: "Status", sortable: true },
      ],
      items: [],
      status: [
        {
          true: "Done",
          false: "Undone",
        },
        {
          true: "light-success",
          false: "light-danger",
        },
      ],
      priority: [
        {
          low: "LOW",
          high: "HIGH",
          medium: "MEDIUM",
        },
        {
          low: "light-success",
          high: "light-danger",
          medium: "light-primary",
        },
      ],
      today: "",
      datefilter:'',
      statusFilter:null,
      searchDisabled:true,
      editId:null,
      isModalDisplay:true
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
    resultQuery() {
      const byDate = (item) => {
        const itemDate = new Date(item.due_date);
        return (
          itemDate >= new Date(this.datefilter.split('to')[0]) &&
          itemDate <= new Date(this.datefilter.split('to')[1])
        );
      };

      const byStatus = (item) => {
        return(
          item.status == this.statusFilter
        );
      };
      let results = this.items;

      if (this.datefilter) {
         results = results.filter(byDate);
      }
      if(this.statusFilter !=null) {
        results = results.filter(byStatus);
      }
      this.totalRows = results.length;
      console.log("Total Row :",this.totalRows );
      this.currentPage = 1;
      return results;
    },
  },
  watch: {
    '$route'() {
      this.statusFilter =null;
      this.filter='';
      let parm = this.$route.params;
      this.searchDisabled = false;
      if(parm.tag) {
        this.filter = this.$route.params.tag;
       // this.searchDisabled = false;
      }
      else if(parm.filter){
         this.statusFilter = this.$route.params.filter
       //  this.searchDisabled = false;
      } else {
        this.searchDisabled = true;
      }
      console.log(this.$route.params.tag);
    }
  },
  mounted() {
    this.fillTodoTable();
    this.filter = this.$route.params.tag;
    this.statusFilter = this.$route.params.filter;
  },
  destroyed() {
    this.statusFilter = '';
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    // Todo Table data fill
    async fillTodoTable() {
      this.token = JSON.parse(localStorage.getItem("userData")).accessToken;
      await axios.post("todo/list").then((success) => {
        this.items = success.data.data.todos;
      });
      // Set the initial number of items
      this.totalRows = this.items.length;
      var currentDate = new Date();
      let cdate = currentDate.toLocaleDateString();
      this.today = moment(String(cdate)).format("Y-DD-MM");
    },
    //send edit data id 
    editData(id) {
      this.isModalDisplay = true;
      this.editId  = id;
    },
    deleteData(id) {
     this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          axios
        .delete(`todo/delete/${id}`)
        .then((success) => {
          this.$swal({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your record has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.fillTodoTable();
        })
        .catch((error) => {
          this.toastMessage("Data not found!!!", "danger");
        });
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Your record is safe :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
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
    // Clear Date Filter
    clearDateFilter() {
      this.datefilter = ''
    },
    // exportData
    async exportData() {
      let datefilter  = this.datefilter.split('to');
      let startDate = moment(datefilter[0],"YYYY-MM-DD");
      let endDate = moment(datefilter[1],"YYYY-MM-DD")
      await axios.post('/todo/export-data',{
        start_date:startDate,
        end_date:endDate,
        search:this.filter,
      })
        .then((success) => {
          this.toastMessage(success.data.message, 'success');
          var fileURL = window.URL.createObjectURL(new Blob([success.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'test.csv');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
    },
    closeModal() {
      this.isModalDisplay = false;
    }
  }
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
