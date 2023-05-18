export default [
  {
    header: 'Pages',
    icon: 'FileIcon',
    children: [
      {
        title: 'Home',
        route: 'home',
        icon: 'HomeIcon',
      },
      {
        title: 'Second Page',
        route: 'second-page',
        icon: 'FileIcon',
      },
      {
        title: 'UserList',
        route: 'user-list',
        icon: 'Usericon'
      },
      {
        title: 'Todo',
        icon: 'CheckSquareIcon',
        children: [
          {
            title: 'Add Task',
            route: 'todo-add',
            icon: 'PlusIcon'
          },
          {
            title: 'My Task',
            route: 'todo-table',
            icon:  'MailIcon'
          },
          { 
            title: 'Completed', 
            icon: 'CheckIcon', 
            route: { name: 'apps-todo-filter', params: { filter: '1' } } 
          },
          { 
            title: 'High', 
            route: { name: 'apps-todo-filter-tag-high', params: { tag: 'high' } } 
          },
          { 
            title: 'Low', 
            route: { name: 'apps-todo-filter-tag-low', params: { tag: 'low' } } 
          },
          { 
            title: 'Medium', 
            route: { name: 'apps-todo-filter-tag-medium', params: { tag: 'medium' } } 
          },
        ],
      },
    ],
  },
]
