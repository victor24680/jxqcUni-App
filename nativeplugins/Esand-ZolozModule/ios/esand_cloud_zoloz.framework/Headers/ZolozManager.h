//
//  ZolozVerify.h
//  esand_ios_demo
//
//  Created by eSandInfo on 2018/7/2.
//  Copyright © 2018年 esandinfo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZolozResult.h"
#import <UIKit/UIViewController.h>
#import "ZolozCommon.h"

/**
 * 可信身份认证管理类
 */
@interface ZolozManager : NSObject

/**
 * 初始化函数
 - param
 - vc 视图控制器
 */
- (id)initWithUIViewController:(UIViewController *)vc;

/**
 * 执行认证操作
 - param
 - msg  认证请求报文
 - zolozCallback 结果回调
 */
- (void) zolozAuthWithCerName:(NSString *)certName WithCerNo:(NSString *)certNo zolozCallback:(ZolozCallback) zolozCallback;

@end
