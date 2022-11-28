//
//  VideoContentView.m
//  RNErrorDemo
//
//  Created by lcc on 2022/11/26.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "VideoContentView.h"
#import "VideoView.h"

@interface VideoContentView ()

@property (nonatomic, strong) VideoView *videoView;

@end

@implementation VideoContentView

- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]) {
    self.videoView = [[VideoView alloc] init];
    self.videoView.frame = CGRectMake(0, 200, 100, 100);
    self.videoView.backgroundColor = UIColor.greenColor;
    [self addSubview:self.videoView];
  }
  return self;
}


- (void)play{
  NSLog(@"play =====");
}

- (void)layoutSubviews{
  [super layoutSubviews];
}

@end
