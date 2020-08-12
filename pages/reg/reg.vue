<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账&nbsp;&nbsp;号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input type="text" clearable v-model="phone" placeholder="请输入申购人手机号"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				phone: '',
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}

				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

			/* 	if (this.phone.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不能小于11位'
					});
					return;
				}

				if (this.id_card.length < 18) {
					uni.showToast({
						icon: 'none',
						title: '身份证号不能少于18位'
					})
				} */
				//检测邮箱
				/* if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				} */
				const data = {
					account: this.account,
					password: this.password,
					phone: this.phone,
				}
				service.addUser(data);
				/* uni.showToast({
					title: '注册成功'
				});
				uni.navigateBack({
					delta: 1
				}); */
			}
		}
	}
</script>

<style>

</style>
