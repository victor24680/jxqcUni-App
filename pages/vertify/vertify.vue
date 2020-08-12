<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="input-group" style="text-align: center;width: 100%;font-size: 32rpx;padding-bottom: 10rpx;">

				<view class="input-row border">
					<text class="title">姓    名：</text>
					<m-input class="m-input" type="text"  focus v-model="realname" placeholder="姓名"></m-input>
				</view>
				
				<view class="input-row">
					<text class="title">身份证：</text>
					<m-input type="text" v-model="idcard" focus placeholder="身份证"></m-input>
				</view>
	
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="subVertify">开 始 认 证</button>
			</view>
		</form>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {

			}
		},
		methods: {
			subVertify(){
				var ZolozModule = uni.requireNativePlugin("Esand-ZolozModule")
				    ZolozModule.zolozAuth({
				        'mCertNo': 430621198910095071,
				        'mCertName': '唐清'
				    },
				    (ret) => {
				        var retJson = JSON.parse(ret);
				        if (retJson.code == 'ZOLOZ_SUCCESS') {
				            var reqJson = JSON.parse(retJson.message);
				            var bizid = reqJson.bizid
				            var certifyId = reqJson.certifyId
				            console.log('开始请求阿里云获取结果')
				            uni.request({
				                url: 'https://ediszim.market.alicloudapi.com/zoloz/zim/getResult',
				                method: 'POST',
				                data: {
				                    'bizId': bizid,
				                    'certifyId': certifyId
				                },
				                header: {
				                    'Authorization': 'APPCODE 5c024f7a3b3746fd9b942629959e392b',
				                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				                },
				                success: (res) => {
				                    console.log('网络请求成功' + JSON.stringify(res.data))
				                        uni.showModal({
				                        title: "获取结果成功",
				                        content: JSON.stringify(res.data),
				                    })
				                }
				            })
				        }else{
				            uni.showModal({
				                title: "发生错误",
				                                content: JSON.stringify(ret),
				            })
				        }
				    })
			},
			bindLogin(){
				console.log("OKOK");
			}
		}
	}
</script>

<style>
	
</style>
