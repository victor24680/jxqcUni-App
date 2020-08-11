//
//  ZolozResult.h
//  esand_ios_demo
//
//  Created by eSandInfo on 2018/8/16.
//  Copyright © 2018年 esandinfo. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "ZolozErrCode.h"

/**
 * 执行结果
 */
@interface ZolozResult : NSObject

- (id) initWithCode:(ZolozErrCode)code msg:(NSString *) msg;

/**
 * 执行结果的状态码
 */
@property  (nonatomic) ZolozErrCode code;

/**
 * 执行结果数据
 */
@property  (nonatomic, copy) NSString *msg;

@end
