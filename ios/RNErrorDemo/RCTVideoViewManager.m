//
//  RCTVideoViewManager.m
//  RNErrorDemo
//
//  Created by lcc on 2022/11/26.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "RCTVideoViewManager.h"
#import <React/RCTUIManager.h>
#import "VideoContentView.h"

@implementation RCTVideoViewManager

RCT_EXPORT_MODULE();


//导出方法
RCT_EXPORT_METHOD(play:(nonnull NSNumber *)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,VideoContentView *> *viewRegistry) {
    //根据reactTag取出对应的目标视图
    VideoContentView *view = viewRegistry[reactTag];
    if ([view isKindOfClass:VideoContentView.class]) {
        //此处获取到了系统的MKMapView组件，可以调用MKMapView的内置方法
        // { code }
      [view play];
    }
  }];
}

//返回Native UI
-(UIView *)view{
  return [[VideoContentView alloc] init];
}

@end
