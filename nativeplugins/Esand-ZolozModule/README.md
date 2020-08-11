## 商品地址

[https://market.aliyun.com/products/57000002/cmapi00041091.html](https://market.aliyun.com/products/57000002/cmapi00041091.html)

## 演示地址
[https://netmarket.oss-cn-hangzhou.aliyuncs.com/product/2f9fe66122de48a2af19e5270c804788.mp4](https://netmarket.oss-cn-hangzhou.aliyuncs.com/product/2f9fe66122de48a2af19e5270c804788.mp4)

## demo地址

git@code.aliyun.com:os-esandinfo/es-uniapp-plugins.git


## 插件说明

**依托活体检测(静默活体)、人脸比对等生物识别技术进行的自然人真实身份的核验服务。**

**高准确性：** 金融级精准度，真实业务场景中的误识率低于十万分之一。高安全性：全球领先活体检测技术，能有效拦截照片、视频、3D 软件模拟及面具攻击。

**权威比对源：** 权威数据源，充分保证数据的合规、稳定、准确。

**高稳定性：** 采用蚂蚁金融科技高可用、动态扩展的服务框架体系。

**海量业务验证：** 实践验证，成熟可靠，服务超过 2 亿互联网金融用户，保障超 20 亿次交易安全。

**极致体验：** 眨眼交互，体验友好，秒级验证通过。

**活体检测：** 独特的眨眼活体检测模式，在保证高安全水位的同时，为客户提供了优质的体验。

**人脸识别：** 高精度人脸检测和比对算法，极速响应。

**权威比对：** 与权威数据源比对，金融级精准度，真实业务场景中的误识率低于十万分之一

## 使用方式

### 1. 将插件ZolozModule放入项目根目录下的nativeplugins文件夹下

### 2. 导入插件

### 3. 到商品地址购买免费套餐（不用花钱!!!!!）

### 4. 替换自己的appcode

### 5. 调用插件

``` 
var ZolozModule = uni.requireNativePlugin("Esand-ZolozModule")

	ZolozModule.zolozAuth({
		'mCertNo': e.detail.value.mCertNo,
		'mCertName': e.detail.value.mCertName
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
					'Authorization': 'APPCODE 替换成自己的appcode',
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

```

# Q&A

* QQ群 --1145603428

--- 


有使用上的问题可以随时联系，谢谢
