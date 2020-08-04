<template>
	<view class="content wrap" style="border:none;">
		<!-- <view v-if="hasLogin" class="hello" style="display: none;">
			<view class="title">
				您好 {{userName}}，您已成功登录。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
			</view> 
			
		</view> -->
		<view v-if="!hasLogin" class="hello" style="background-color: #FFFFFF;">
			<!-- <view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</vie class> -->
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
					<t-tr>
						<t-td>
							基金名
						</t-td>
						<t-td>
							基金名
						</t-td>
						<t-td>
							基金名
						</t-td>
						<t-td>
							<navigator url="../detail/detail">投票详情</navigator>
						</t-td>
					</t-tr>
				</t-table>
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
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		methods: {
			trasferToUrl() {
				uni.navigateTo({
					url:'../detail/vote_detail'
				})
			}
		},
		onLoad() {
			if (!this.hasLogin) {
				///基金投票列表
				return true;
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
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
