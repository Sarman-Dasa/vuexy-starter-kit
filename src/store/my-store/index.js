export default {
    namespaced: true,
    state: {
        title:'vuex',
        description:'state management'
    },
    mutations: {
        setNewTitle(state, payload) {
           //1st way
           // state.title = "@"+payload;

           //2nd way
           state.title = "@"+payload.title;
        }
    }
}