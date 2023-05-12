<template>
  <b-row sm="12">
    <b-col md="2" sm="4" class="my-1">
      <b-form-group class="mb-0">
        <label class="d-inline-block text-sm-left mr-50">Per page</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
          class="w-50"
        />
      </b-form-group>
    </b-col>
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
    <b-col md="6" class="my-1">
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

    <b-col sm="12">
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
              <feather-icon icon="Edit2Icon" class="mr-50" />
              <span @click="editData(data.item.id)">Edit</span>
              <!-- <b-link :to="{ name: 'todo-edit', params:{id:1}}">edit</b-link> -->
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="TrashIcon" class="mr-50" />
              <span @click="deleteData(data.item.id)">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

       
        <!-- User image -->
        <template #cell(avatar)="data">
            <b-avatar variant="primary" :text="data.item.user.first_name[0] + data.item.user.last_name[0]"></b-avatar>
        </template>
      </b-table>
    </b-col>

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
  BLink,
} from "bootstrap-vue";
import axios from "axios";
import moment from "moment";
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
    BDropdown,
    BDropdownItem,
    BLink,
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
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "priority", label: "Priority", sortable: true },
        { key: "due_date", label: "Due Date", sortable: true },
        { key: "user.first_name", label: "User", sortable: true },
        {key: 'avatar', label:'Image'},
        { key: "action", label: "Action", value: "id" }
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
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  async mounted() {
    this.fillTodoTable();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async fillTodoTable() {
      this.token = JSON.parse(localStorage.getItem("userData")).accessToken;
      console.log("Token :", this.token);
      await axios.post("todo/list").then((success) => {
        this.items = success.data.data.todos;
      });
      // Set the initial number of items
      this.totalRows = this.items.length;
      var currentDate = new Date();
      let cdate = currentDate.toLocaleDateString();
      this.today = moment(String(cdate)).format("Y-DD-MM");
    },
    editData(id) {
      this.$emit("todo_id", id);
    },
    async deleteData(id) {
      await axios
        .delete(`todo/delete/${id}`)
        .then((success) => {
          this.toastMessage(success.data.message, "success");
          this.fillTodoTable();
        })
        .catch((error) => {
          this.toastMessage("Data not found!!!", "danger");
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
  },
};
</script>
