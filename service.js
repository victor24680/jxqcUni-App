// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	console.log(ret);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let boolen = false;
	//前端写入注册的数据
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.request({
		url: 'http://www.modeljxqc.com/home/api/reg',
		data: {
			account: userInfo.account,
			password: userInfo.password
		},
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method:'POST',
		success: (res) => {
			if (res.data.retCode == '00') {
				uni.showToast({
					title: '注册成功',
					icon: 'success',
				});
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.showToast({
					title: '注册失败'
				});
			}
		},

	});
}

export default {
	getUsers,
	addUser
}