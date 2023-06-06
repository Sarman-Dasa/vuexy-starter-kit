import store from "@/store"
let userRole = store.state.app.userInfoData ? store.state.app.userInfoData.role : '';
console.log("User Role::",userRole);
const menuItem = [ 
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  }
];

const hrMenu = 
  {
    title: 'Second Page',
    route: 'second-page',
    icon: 'FileIcon',
  };

const supperAdminMenu = 
  {
    title: 'UserList',
    route: 'user-list',
    icon: 'UserIcon'
  };

const employeeMenu=
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
  };

if(userRole == 'superAdmin') {
  menuItem.push(hrMenu);
  menuItem.push(supperAdminMenu);
  menuItem.push(employeeMenu);
  menuItem.push(
    {
      title: 'UserData',
      route: 'user-data',
      icon: 'UserIcon'
    },{
      title: 'Main View',
      route: 'mainView',
      icon: 'FileIcon'
    }
    );
}

else if(userRole == 'humanResource') {
  menuItem.push(hrMenu)
}

else if(userRole == 'Employee') {
  menuItem.push(employeeMenu);
}
export default menuItem;
