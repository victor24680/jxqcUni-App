<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账户：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @click="bindAuthorize">绑 定</button>
		</view>
		<!-- <view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				openid:'',
			}
		},
		methods: {
			...mapMutations(['setUser']),
			bindAuthorize() {
				console.log('this.openid');
				console.log(this.openid);
				if (this.openid == '') {
					return;
				}
				var self_this = this;
				console.log('this.openid');
				console.log(this.openid);
				var self_this = this;
				uni.request({
					url: "http://www.jinxqc.com/home/api/wxBind",
					data: {
						account: this.account,
						password: this.password,
						openid: this.openid,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method:"POST",
					success: (response) => {
						console.log(response);
						if(response.data.retCode == '00') {
							self_this.setUser(self_this.account);
							wx.reLaunch({
								url:'user'
							});
						}
					}
				})
			}
		},
		onLoad:function(){
			var openid = uni.getStorageSync('OPEN_ID_KEY');
			if(openid != undefined && openid != '') {
				this.openid = openid;
			}
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
