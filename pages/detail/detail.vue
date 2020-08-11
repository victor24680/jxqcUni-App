<template>
	<view class="content wrap">
		<view class="hello" style="background-color: #FFFFFF;">
			<uni-list>
				<uni-list-item title="产品名称" show-arrow="false" class="list-shu-style">
				</uni-list-item>
				<uni-list-item style="font-size: 14px;">{{detail.name}}</uni-list-item>

				<uni-list-item title="申购金额" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item style="font-size: 14px;">{{detail.money}}</uni-list-item>

				<uni-list-item title="产品期限" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item style="font-size: 14px;">{{detail.duration}}</uni-list-item>

				<uni-list-item title="申购日期" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item style="font-size: 14px;">{{detail.date}}</uni-list-item>

				<uni-list-item title="投票选项" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item style="font-size: 12px;">
					<view class="uni-padding-wrap">
						<view>
							<!--radio-group-->
							<radio-group @change="radioChange">
								<label class="radio" v-for="(item,index) in items" :key="item.value">
									<radio :value="item.value" color="#0FAEFF" :checked="index === current" style="margin-left: 30rpx;" @click="radioChange"
									 style="" />{{item.name}}
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</label>
							</radio-group>
						</view>
					</view>
				</uni-list-item>

				<uni-list-item title="投票结果" show-arrow="false" class="list-shu-style">

				</uni-list-item>

				<uni-list-item>
					<text>已投票</text>
					<cmd-progress :percent="progress_show" :stroke-width="24" style="margin-top: 5rpx;" ></cmd-progress>
					
					<view style="margin-top: 20rpx;" v-for="item_progress in items">
						<text>{{item_progress.name}}</text>
						<cmd-progress :percent="item_progress.vote_result" :stroke-width="24" style="margin-top: 5rpx;" ></cmd-progress>
					</view>
					
					
				</uni-list-item>

				<view style="margin-top: 50rpx;margin-bottom: 210rpx;" v-if="is_show_vote == 1">
					<view class="uni-padding-wrap uni-common-mt">
						<button type="primary" v-on:click="confirmVote" style="background-color: #00AAEE;">确 认 投 票</button>
					</view>
				</view>
				
				<view style="margin-top: 50rpx;margin-bottom: 210rpx;" v-if="is_show_vote == 0">
					<view class="uni-padding-wrap uni-common-mt">
						<button type="primary"  disabled="true" style="background-color: #62ABFB;">已 投 票</button>
					</view>
				</view>

			</uni-list>

		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/lib/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-ui/lib/uni-list-item/uni-list-item.vue'
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		components: {
			uniList,
			uniListItem,
			components: cmdProgress
		},
		data() {
			return {
				items: [],
				current: 0,
				detail: {},
				current_value: '',
				current_id: 0,
				progress_show: 38,
				is_show_vote:1,
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.current_value = this.items[i].value;
						break;
					}
				}
			},
			confirmVote: function() {
				console.log(this.current_value);
				var select_value = this.current_value;
				var current_id = this.current_id;
				var self = this;
				/**
				 * 确认投票
				 * 
				 */
				uni.request({
					url: 'http://www.modeljxqc.com/home/api/votePost',
					data: {
						current_id: current_id,
						select_value: select_value
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: "POST",
					success: (res) => {
						console.log(res);
						if (res.data.retCode == '00') {
							self.is_show_vote = 0;
							uni.showToast({
								icon: "success",
								title: '投票成功',
							});
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
		onLoad: function(option) {
			const id = option.id;
			this.current_id = id;
			if (id == '' || id == undefined) {
				uni.showToast({
					icon: 'none',
					title: '页面加载错误',
				});
				return;
			};
			var self = this;
			uni.request({
				url: 'http://www.modeljxqc.com/home/api/getProductDetail',
				data: {
					id: id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log(res);
					if (res.data.retCode == '00') {
						var data_option = res.data.data;
						self.items = data_option.vote_option;
						self.detail = data_option;
						//定义默认的选中值
						self.current_value = self.items[0].value;
						self.is_show_vote=data_option.is_show_vote;//是否显示可以投票
					} else {
						uni.showToast({
							icon: 'none',
							title: '数据请求失败',
						});
					}
				},
			});
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
