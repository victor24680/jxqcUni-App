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
				<button type="primary" class="primary" @tap="bindLogin">开 始 认 证</button>
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
				const PPFace = uni.requireNativePlugin('PP-BaiduFace');
				    var config={
				        licenseName: 'idl-license',
				        licenseSuffix: 'face-android',//这里ios 跟 android 应该不一样
				        licenseId: 'ppface-face-android', //这里ios 跟 android 应该不一样
				        liveActionArray: ["Eye", "HeadUp", "HeadDown"],
				        bgColor:"#56445D", //android背景颜色，ios需要修改资源图片完成
				        textColor:"#C5E99B", //文本已经圆框颜色
				        isSound:false, //默认是否开启语音提示 默认值：false
				        AutoClip:true ,//自动裁剪用户脸部区域 默认：false
				        isBackCamera:_self.backCamera, //1.43版本加入 启用后置摄像头 默认false
						hasPic:true// 1.59版本加入 android采集返回拍照（无黑边）原图，ios下个版本加入
				    };
				
				    //活体识别需要传入动作
				    PPFace.faceliveness(config, result => {
				        //result.base64ImageMap 一个动作一张外加一张正面采集
				                //result.base64ImageMap.bestImage0 为默认最佳照片
				
				    });
				
				    //人像采集
				    PPFace.recycler(config, result => {
				       //result.base64ImageMap 图像集合 一张
				       //result.originalPic  采集返回拍照（无黑边）原图（目前支持android 后续版本加入ios,需配置 hasPic=true）
				    });
			},
			bindLogin(){
				console.log("OKOK");
			}
		}
	}
</script>

<style>
	
</style>
