<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账户：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号或身份证号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		
		<view class="btn-row">
			<button type="primary" class="primary"  @click="bindLogin">登录</button>
		</view>
		
		<!-- <view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view> -->
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				<!-- #ifdef MP-WEIXIN -->
				<!--如果有此按钮，会自动获取下面的中的方法getUserInfo-->
				<!-- <button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> -->
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
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
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login', 'setUser','setHasLogin']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
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
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};

				/*
				 * 【原有模拟测试登录】
				const validUser = service.getUsers().some(function(user) {
					console.log(user);
					return data.account === user.account && data.password === user.password;
				}); */

				/**
				 * 登录设置
				 * 
				 */
				uni.request({
					url: 'http://www.jinxqc.com/home/api/login',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if (res.data.retCode == '00') {
							this.toMain(this.account);
							this.setUser(this.account); //设置绑定的账户
						} else {
							uni.showToast({
								icon: 'none',
								title: '（服务端）用户账号或密码错误',
							});
						}
					},
				});
				
			},

			/**
			 * @param {Object} value
			 * 授权第三方登录
			 * AppId:wxe7308b0e4f1fd474
			 * AppSercret:1a32571ee2e78109d3621754ebe713ea
			 */
			oauth(value) {
				//获取oppenID
				var self_this = this;
				wx.login({
					success(response) {
						if (response.code) {
							
							uni.request({
								url: 'https://www.jinxqc.com/home/api/wxLogin',
								data: {
									code: response.code
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								method: 'POST',
								success: (resps) => {
									console.log(resps);
									/**
									 * res.data
									 * 响应参数
									 * openid 微信登录凭证
									 * sessionKey 微信登录凭证
									 * 
									 */
									if (resps.data.retCode == '00') {
										//缓存数据
										uni.setStorageSync('OPEN_ID_KEY',resps.data.data.openid);
										self_this.setHasLogin();
										self_this.setUser(resps.data.data.account); //设置绑定的账户
										uni.reLaunch({
											url:'../user/user'
										});
									} else {
										uni.showToast({
											title:'登录失败',
											icon:"none"
										})
									}
									
									//获取微信登录头像信息【不能单独作为微信登录授权凭证】
									//获取微信头像
									// uni.login({
									// 	provider: value,
									// 	success: (res) => {
									// 		uni.getUserInfo({
									// 			provider: value,
									// 			success: (infoRes) => {
									// 				//获取微信openID登录凭证，并业务处理 self_this.toMain(infoRes.userInfo.nickName);
									// 				/**
									// 				 * 传送用户信息和openID至服务进行登录逻辑处理
									// 				 */
													
									// 			},
									// 			fail() {
									// 				uni.showToast({
									// 					icon: 'none',
									// 					title: '登陆失败2'
									// 				});
									// 			}
									// 		});
									// 	},
									// 	fail: (err) => {
									// 		console.error('授权登录失败：' + JSON.stringify(err));
									// 	}
									// });
									
									
								},
							});
							
						} else {
							console.log('登陆失败！' + response.errMsg);
						}
					}
				});
			},
			
			getUserInfo({detail}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			/**
			 * @param {Object} userName龙
			 * 登录之后的跳转
			 */
			toMain(userName) {
				//登录之后：开始跳转【设置全局登录状态】
				this.login(userName);
				wx.reLaunch({
					url: '../user/user',
				});
			},
			/**
			 * 设置用户名全局变量
			 * 
			 */
			toUser(user_name) {
				this.setUser(user_name);
			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
	
	// Page({
	// 	bindTapLogin:function(){
	// 		wx.showToast({
	// 			title:"微信提示",
	// 			icon:"success"
	// 		})
	// 	}
	// })
	
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
