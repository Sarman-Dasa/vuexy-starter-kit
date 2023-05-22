export default {
    namespaced: true,
    state: {
        title:'vuex',
        description:'state management',
        userId:'000',
        phone:'965634235678'
    },
    mutations: {
        setNewTitle(state, payload) {
           //1st way
           // state.title = "@"+payload;

           //2nd way
           state.title = "@"+payload.title;
        }
    },
    actions: {
        //1st way
        // newTitle(context,payload) {
        //    setTimeout(() => {
        //     context.commit('setNewTitle',payload)
        //    },2000)  
        // }

        //2nd way
        newTitle(context,payload) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    context.commit('setNewTitle',payload)
                    resolve('ok')
                   }, 2000)  
            })
        }
    },
    getters: {
        //get data with some modification 
        hashAdd(state) {
            return state.userId+ '####';
        },
        // call other getters
        hashNewAdd(state,getters) {
            return getters.hashAdd + " mobile Number "+ state.phone;
        },
        //pass data into getters
        newUserId: (state) => (id) => {
            return state.userId+''+id;
        }

    }
}