<template>
	
	<view class="content">
		<uni-list v-if="hasLogin">
			<uni-list-item title="人脸认证" show-arrow="false" class="list-shu-style"></uni-list-item>
			<uni-list-item style="font-size: 14rpx;">
				<view class="uni-padding-wrap uni-common-mt">
					<button type="primary" v-on:click="checkVertify" style="background-color: #0077cc;">开 始 认 证</button>
				</view>
			</uni-list-item>
		</uni-list>
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/lib/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-ui/lib/uni-list-item/uni-list-item.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components:{
			uniList,
			uniListItem
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			checkVertify(){
				uni.navigateTo({
					url:'../vertify/vertify'
				})
			}
		}
	}
</script>

<style>
.list-shu-style {
		font-weight: bold;
		border-left: 3px solid #333333;
		height: 80rpx;
	}

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>
