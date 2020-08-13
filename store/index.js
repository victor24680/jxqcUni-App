import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		user_name: ""
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';//可能为微信昵称和账户名
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setUser(state,user_name) {
			/**
			 * 设置用户名全局变量（只能为账户名：不能为微信昵称）
			 */
			state.user_name = user_name;
		}
	}
})

export default store
