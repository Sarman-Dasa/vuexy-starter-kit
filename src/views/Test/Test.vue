<template>
<div>
  <b-row>
    <b-col>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          v-b-toggle.sidebar-right
          variant="outline-primary"
        >
          Toggle Sidebar
        </b-button>
        <b-sidebar id="sidebar-right" shadow bg-variant="white" backdrop  right>
        <b-list-group class="list-group-filters">
          <b-list-group-item
            v-for="filter in taskFilters"
            :key="filter.title + $route.path"
            :to="filter.route"
          >
            <feather-icon :icon="filter.icon" size="18" class="mr-75" />
            <span class="align-text-bottom line-height-1">{{
              filter.title
            }}</span>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
    </b-col>
    <b-col>
      <layout>
          <router-view/>
     </layout>
    </b-col>
  </b-row>
</div>
</template>
<script>
import router from "@/router";
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
  BListGroup,
  BListGroupItem,
  VBToggle,
  BSidebar,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BCol,
    BRow,
    BListGroup,
    BListGroupItem,
    BButton,
    BSidebar,
    router
},
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      taskFilters: [
        {
          title: "Add Task",
          route: "todo-add",
          icon: "PlusIcon",
        },
        {
          title: "My Task",
          route: "todo-table",
          icon: "MailIcon",
        },
        {
          title: "Completed",
          icon: "CheckIcon",
          route: { name: "apps-todo-filter", params: { filter: "1" } },
        },
        {
          title: "High",
          route: { name: "apps-todo-filter-tag", params: { tag: "high" } },
        },
        {
          title: "Low",
          route: { name: "apps-todo-filter-tag", params: { tag: "low" } },
        },
        {
          title: "Medium",
          route: { name: "apps-todo-filter-tag", params: { tag: "medium" } },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-todo.scss";
</style>
