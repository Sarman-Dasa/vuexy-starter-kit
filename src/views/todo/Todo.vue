<template>
  <b-row class="border p-2">
    <b-col sm="2" class="border-right p-2">
      <div class="sidebar-left">
        <div class="sidebar">
          <div class="sidebar-content todo-sidebar">
            <div class="todo-app-menu">
              <div class="add-task">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  block
                  @click="tab='AddTodoTask'"
                >
                  Add Task
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 200, 0.15)'"
                  variant="secondary"
                  block
                  @click="tab='TodoList'"
                >
                  List Todo
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col sm="10">
        <component :is="tab"/>
    </b-col>
  </b-row>
</template>

<script>
import Ripple from "vue-ripple-directive";
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
  BListGroup,
} from "bootstrap-vue";
import AddTodoTask from './AddTodoTask.vue'
import TodoList from './TodoList.vue'
export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
    BListGroup,
    BRow,
    BCol,
    AddTodoTask,
    TodoList,
  },
  data() {
    return {
        tab:'TodoList'
    }
  }
};
</script>
