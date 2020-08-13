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
			}
		},
		mounted: function() {
			this.getLists();
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'user_name']),
		methods: {
			trasferToUrl(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			},
			getLists() {

				//检测是否已经登录
				if (!this.hasLogin) {
					return;
				}

				if (this.user_name == '') {
					uni.showModal({
						title: "提示",
						content: "微信授权账户未与平台账户绑定",
						success: (res) => {
							if (res.confirm) {
								wx.reLaunch({
									url: "../user/user",
								});
							} else {
								return;
							}
						}
					});
					return;
				}
				
				var self = this;
				uni.request({
					url: 'http://www.jinxqc.com/home/api/getList',
					data: {
						user_name: this.user_name
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
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

		onLoad() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: "../login/login",
				});
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
