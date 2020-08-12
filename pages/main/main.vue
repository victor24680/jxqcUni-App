<template>
	<view class="content wrap" style="border:none;">
		<view v-if="hasLogin" class="hello" style="display: block;">
			<view class="box">
				<t-table style="margin: 0rpx;">
					<t-tr>
						<t-th>
							基金名
						</t-th>
						<t-th>
							日期
						</t-th>
						<t-th>
							金额
						</t-th>

						<t-th>
							操作
						</t-th>
					</t-tr>
					<t-tr v-for="item in lists">
						<t-td>
							{{item.name}}
						</t-td>
						<t-td>
							{{item.date}}
						</t-td>
						<t-td>
							{{item.money}}
						</t-td>
						<t-td>
							<navigator @click="trasferToUrl(item.id)" style="color: #0077cc;">投票详情</navigator>
						</t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello" style="background-color: #FFFFFF;">
			<view style="margin-top: 50rpx;text-align: center;">
				<text style="float: left;margin-left: 150rpx;">您还未登陆，请点击</text> 
				<navigator :url="'../login/login'" style="color: #007AFF;float: left;">登陆</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';

	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				lists: [],
				user_id: '',
			}
		},
		mounted: function() {
			this.getLists();
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		methods: {
			trasferToUrl(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			},
			getLists() {
				if(!this.hasLogin){
					return;
				}
				var self = this;
				uni.request({
					url: 'http://www.jinxqc.com/home/api/getList',
					data: {},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res);
						if (res.data.retCode == '00') {
							self.lists = res.data.data;
						} else {
							uni.showToast({
								icon: 'none',
								title: '数据请求失败',
							});
						}
					},
				});
			}
		},

		onLoad(options) {
			const user_id=options.user_id;
			if(user_id != undefined && user_id != null && user_id != '') {
				this.user_id = user_id;
			}
			if (!this.hasLogin) {
				uni.navigateTo({
					url:"../login/login",
				});
				///基金投票列表
				// uni.showModal({
				// 	title: '未登录',
				// 	content: '您未登录，需要登录后才能继续',
				// 	/**
				// 	 * 如果需要强制登录，不显示取消按钮
				// 	 */
				// 	showCancel: !this.forcedLogin,
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			/**
				// 			 * 如果需要强制登录，使用reLaunch方式
				// 			 */
				// 			if (this.forcedLogin) {
				// 				uni.reLaunch({
				// 					url: '../login/login'
				// 				});
				// 			} else {
				// 				uni.navigateTo({
				// 					url: '../login/login'
				// 				});
				// 			}
				// 		}
				// 	}
				// });
			}
		}

	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>
