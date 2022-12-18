import React, {PureComponent} from 'react';
/* eslint-disable-next-line */
import {
  Text,
  StyleSheet,
  View,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import RRVideoView from './RRVideoView';

const windowWidth = Dimensions.get('window').width;

export default class RRVideoViewer extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {visible, videoIndex, videoUrls} = nextProps;
    let derivedState = null;
    if (videoUrls !== undefined) {
      derivedState = {...derivedState, videoUrls};
    }
    if (visible !== undefined) {
      derivedState = {...derivedState, visible};
    }
    if (videoIndex !== undefined) {
      derivedState = {...derivedState, videoIndex: videoIndex};
      if (videoIndex !== prevState.prevCurIndicator) {
        derivedState.prevCurIndicator = videoIndex;
        derivedState.curIndicator = videoIndex;
      }
    }
    return derivedState;
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      videoIndex: 0,
      videoUrls: [],
    };
    this.currentIndex = 0;
  }

  _close() {
    const {onClose} = this.props;
    this.setState({visible: false});
    onClose?.();
  }

  showByIndex(videoIndex, videoUrls) {
    this.videoIndex = videoIndex;
    this.setState({visible: true});
    if (videoUrls) {
      this.setState({videoUrls});
    }
    this._isShowByIndexTrigger = true;
  }

  _scrollViewRef(ref) {
    this._scroView = ref;
  }

  _onLayoutForScrollView(e) {
    if (this._isShowByIndexTrigger) {
      this._scrollToIndex(this.videoIndex);
      this._isShowByIndexTrigger = false;
    }
  }

  _scrollToIndex(index) {
    const offset_x = index * windowWidth;
    this._scroView?.scrollTo({x: offset_x, y: 0, animated: false});
  }

  _renderItem(index) {
    return (
      // <View
      // style={{
      //   width: windowWidth,
      //   backgroundColor: 'yellow',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      // }}>
      //   <Text>{'item' + index}</Text>
      // </View>
      <RRVideoView width={windowWidth} index={index} />
    );
  }

  _onMomentumScrollEnd(event) {
    const {width} = this.state;
    const contentOffset_x = event?.nativeEvent?.contentOffset?.x;
    const currentIndex = contentOffset_x / width;
    console.log('currentIndex = ', currentIndex);
  }

  render() {
    const {visible, videoIndex, curIndicator, videoUrls} = this.state;
    // if (!videoUrls?.length) {
    //   return null;
    // }
    console.log('visible = ', visible);
    return (
      <Modal visible={visible} transparent={true} onRequestClose={this.close}>
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <ScrollView
            style={{flex: 1}}
            horizontal={true}
            pagingEnabled={true}
            ref={(scroView) => {
              this._scrollViewRef(scroView);
            }}
            onLayout={(e) => {
              this._onLayoutForScrollView(e);
            }}
            onMomentumScrollEnd={(event) => {
              this._onMomentumScrollEnd(event);
            }}>
            {videoUrls.map((item) => {
              return this._renderItem(item);
            })}
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              top: 50,
              right: 30,
              paddingLeft: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this._close();
              }}>
              <Text>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

RRVideoViewer.propTypes = {
  videoUrls: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  viewerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object,
  ]),
  videoIndex: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  useFastImage: PropTypes.bool,
  imageViewerProps: PropTypes.object,
  saveToLocalByLongPress: PropTypes.bool,
};

RRVideoViewer.defaultProps = {
  videoIndex: undefined,
  videoUrls: undefined,
  visible: undefined,
  viewerRef: () => {},
  onClose: () => {},
  onChange: () => {},
  useFastImage: false,
  saveToLocalByLongPress: false,
};

// const styles = StyleSheet.create({
//   modalHeaderContainer: {
//     position: 'absolute',
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 30,
//     zIndex: 100,
//   },
//   modalHeaderContentContainer: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: 'rgba(0,0,0,0.25)',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   fullFooter: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   footer: {
//     height: 28,
//     width: 46,
//     backgroundColor: '#3B3C3D',
//     borderRadius: 4,
//     position: 'absolute',
//     bottom: 45,
//     right: 15,
//   },
//   confirmMain: {},
//   footerText: {
//     fontSize: 11,
//     color: '#FFFFFF',
//     lineHeight: 28,
//     textAlign: 'center',
//   },
// });
