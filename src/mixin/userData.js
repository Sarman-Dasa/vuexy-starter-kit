import CryptoJS from 'crypto-js'
export default {
    methods: {
        loginUserData(token,userInfo) {
            //set authToken in localstorage
            this.$store.commit('app/UPDATE_AUTH_TOKEN',token);
            localStorage.setItem('authTokenData',CryptoJS.AES.encrypt(token,process.env.VUE_APP_SECRET_KEY).toString());

            //set user info in localstorage
            let user = {
                id: userInfo.id,
                email: userInfo.email,
                first_name: userInfo.first_name,
                is_active: userInfo.is_active,
                last_name: userInfo.last_name,
                phone: userInfo.phone,
                role: userInfo.role.role
            }
            
            this.$store.commit('app/UPDATE_LOGIN_USER_INFO',user);
            userInfo = CryptoJS.AES.encrypt(JSON.stringify(user),process.env.VUE_APP_SECRET_KEY).toString();
            localStorage.setItem('userInfoData',userInfo);
            this.$router.push({name:'home'});
        }
    }
}