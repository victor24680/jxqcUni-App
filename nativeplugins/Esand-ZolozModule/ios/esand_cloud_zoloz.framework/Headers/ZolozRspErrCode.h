//
//  ZolozRspErrCode.h
//  esand_ios_demo
//
//  Created by ReidLee on 2019/6/27.
//  Copyright © 2019 esandinfo. All rights reserved.
//

#ifndef ZolozRspErrCode_h
#define ZolozRspErrCode_h
// 服务器返回的状态码

/**
 * 执行成功
 */
#define SUCCESS @"0000"
/**
 * 执行失败
 */
#define FAILED @"0001"
/**
 * 无效参数
 */
#define INVALID_PARAM @"4002"
/**
 * 无效签名(签名失败)
 */
#define INVALID_SIGN @"4003"
/**
 * 网络错误
 */
#define NETWORK_ERROR @"4004"
/**
 * 服务器异常,通常是服务器抛异常了
 */
#define SERVER_ERROR @"4005"

#endif /* ZolozRspErrCode_h */
