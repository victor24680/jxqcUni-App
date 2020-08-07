<template>
	<view class="content wrap">
		<view v-if="!hasLogin" class="hello" style="background-color: #FFFFFF;">
			<uni-list>
				<uni-list-item title="产品名称" show-arrow="false" class="list-shu-style">
				</uni-list-item>
				<uni-list-item title="" style="font-size: 14px;">金色木棉双月湾温德姆至尊豪廷度假酒店私募投资基金</uni-list-item>

				<uni-list-item title="申购金额" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item title="" style="font-size: 14px;">￥1,000,000.00万</uni-list-item>

				<uni-list-item title="产品期限" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item title="" style="font-size: 14px;">6个月</uni-list-item>

				<uni-list-item title="申购日期" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item title="" style="font-size: 14px;">2020-08-07</uni-list-item>

				<uni-list-item title="投票选项" show-arrow="false" class="list-shu-style"></uni-list-item>
				<uni-list-item title="" style="font-size: 14px;">
					<view class="uni-padding-wrap">
						<view>
							<!--radio-group-->
							 <radio-group @change="radioChange">
								<label class="radio" v-for="(item,index) in items" :key="item.value">
									<radio :value="item.value" checked="true"  :checked="index === current" style="margin-left: 20rpx;" 
										@click="radioChange"
									/>{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
				</uni-list-item>
				
				<view style="margin-top: 50rpx;margin-bottom: 210rpx;">
					<view class="uni-padding-wrap uni-common-mt">
						<button type="primary" v-on:click="confirmVote">确 认 投 票</button>   
					</view>
				</view>

			</uni-list>
			
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/lib/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-ui/lib/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				items: [{
						value: 'discount',
						name: '打折'
					},
					{
						value: 'fs',
						name: '法诉',
						checked: 'true'
					},
					{
						value: 'fqdf',
						name: '分期兑付'
					},
					{
						value: 'zkfq',
						name: '折扣分期'
					},
				],
				current: 0
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			confirmVote:function(){
				/**
				 * 确认投票
				 * 
				 */
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
