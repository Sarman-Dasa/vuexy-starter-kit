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
    }
}