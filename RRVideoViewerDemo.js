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
} from 'react-native';

import RRVideoViewer from './RRVideoViewer';

export default class RRVideoViewerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
  }
  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RRVideoViewer
          ref={(ref) => {
            this.video = ref;
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.video.showByIndex(2, [1, 2, 3]);
          }}>
          <Text> show</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
