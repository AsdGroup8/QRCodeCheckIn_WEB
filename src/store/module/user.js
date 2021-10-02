import storageService from "@/service/storageService";
import userService from "@/service/userService";

const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        user_info: storageService.get(storageService.USER_INFO) ?
            JSON.parse(storageService.get(storageService.USER_INFO)) :
            null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            storageService.set(storageService.USER_TOKEN, token);
            state.token = token;
        },
        SET_USER_INFO(state, info) {
            storageService.set(storageService.USER_INFO, JSON.stringify(info));
            state.user_info = info;
        }
    },
    actions: {
        register(context, { name, username, password }) {
            return new Promise((resolve, reject) => {
                userService.register({ name, username, password }).then(res => {
                    console.log(res);
                    context.commit('SET_TOKEN', res.data.token);
                    return userService.info();
                }).then(res => {
                    context.commit('SET_USER_INFO', res.data.user);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        login(context, {username, password}) {
            return new Promise((resolve, reject) => {
                userService.login({ username, password }).then(res => {
                    context.commit('SET_TOKEN', res.data.token);
                    return userService.info();
                }).then(res => {
                    context.commit('SET_USER_INFO', res.data.user);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            })
        },

        logout(context) {
            context.commit('SET_TOKEN', '');
            storageService.set(storageService.USER_TOKEN, '');
            context.commit('SET_USER_INFO', '');
            storageService.set(storageService.USER_INFO, '');
            window.location.reload();
        }
    }
}

export default userModule;