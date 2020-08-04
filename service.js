// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password,
		phone: userInfo.phone,
		real_name: userInfo.real_name,
		id_card: userInfo.id_card
	});

	uni.request({
		url: 'http://www.modeljxqc.com/home/api/login',
		data: {
			account: userInfo.account,
			password: userInfo.password,
			phone: userInfo.phone,
			real_name: userInfo.real_name,
			id_card: userInfo.id_card 
		},
		header: {
			'content-type': 'application/json'
		},
		success: (res) => {
			console.log(res.data);
		}
	});

	console.log(users);
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
	getUsers,
	addUser
}
