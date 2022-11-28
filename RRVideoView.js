import React, {Component} from 'react';
import ReactNative, {
  requireNativeComponent,
  NativeModules,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// let NativeModules = require('NativeModules');

//模块类(需要去掉前缀RCT)
const RCTVideoViewManager = NativeModules.VideoViewManager;

//UI组件
const RCTVideoView = requireNativeComponent('RCTVideoView', RRVideoView);

export default class RRVideoView extends Component {
  //方法调用
  componentDidMount() {
    //根据引用获取组件的reactTag作为reload方法的参数传入
  }

  render() {
    return (
      <View style={{width: this.props.width, backgroundColor: 'yellow'}}>
        <TouchableOpacity
          onPress={() => {
            console.log('======-0-----');
            RCTVideoViewManager.play(ReactNative.findNodeHandle(this._video));
          }}>
          <Text style={{marginTop: 100}}> {'item' + this.props.index}</Text>
        </TouchableOpacity>
        <RCTVideoView
          style={{flex: 1, backgroundColor: 'red'}}
          ref={(ref) => {
            this._video = ref;
          }}
        />
      </View>
    );
    // return ;
  }
}
