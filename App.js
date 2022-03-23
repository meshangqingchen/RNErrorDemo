/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback, TouchableHighlight
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { addActiveSceneChangedListener } from 'react-native/Libraries/Utilities/SceneTracker';

import ErrorBoundary from './ErrorBoundary'
// import ErrorBoundary from 'react-native-error-boundary'
import Promise1 from 'bluebird';
import { asArray } from 'bluebird/js/browser/bluebird.core';
/*

错误边界 无法 捕获如下错误:

事件处理 （了解更多）
异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
服务端渲染
错误边界自身抛出来的错误 （而不是其子组件）

*/

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    /*
    _globalHandler 可以捕获
    */
    // setTimeout(()=>{
    //   aaa.fun()
    // }, 1000);
    
    // 错误边界可以捕获
    // aaa.fun()

    this.init_();
  }

  async init_ () {
    const resp = await this.mockAsyncHandle() // 执行异常
    // 后续代码不会再执行
    console.log(resp)
  }

  componentDidMount() {

  }

  onPress() {
     // 错误边界无法捕获 事件处理
    // bbb.fun()
  }

  mockAsyncHandle() {
    return new Promise((resolve,reject)=>{
      // _globalHandler 和 错误边界都捕获不到
      setTimeout(()=>{
        resolve('aaaa')
      }, 1000);
    })
  }

   render() {
    return (
      <TouchableWithoutFeedback onPress={()=>{
       this.onPress();
      }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step One</Text>
          <Text style={styles.sectionDescription}>
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Text>
        </View>
      </TouchableWithoutFeedback>
      
    )  
  } 
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  
  componentDidMount() {
    // require('promise/setimmediate/rejection-tracking').enable({
    //   allRejections: true,
    //   onUnhandled: (id, error = {}) => {
    //     let message
    //     let stack
  
    //     const stringValue = Object.prototype.toString.call(error);
    //     if (stringValue === '[object Error]') {
    //       message = Error.prototype.toString.call(error);
    //       stack = error.stack;
    //     } else {
    //       /* $FlowFixMe(>=0.54.0 site=react_native_oss) This comment suppresses
    //        * an error found when Flow v0.54 was deployed. To see the error delete
    //        * this comment and run Flow. */
    //       message = require('pretty-format')(error);
    //     }
  
    //     const warning =
    //       `Possible Unhandled Promise Rejection (id: ${id}):\n` +
    //       `${message}\n` +
    //       (stack == null ? '' : stack);
    //     console.warn(warning);
    //     // 更新 state 使下一次渲染能够显示降级后的 UI
    //     this.setState({
    //       hasError: true
    //     })
    //   },
    //   onHandled: id => {
    //     const warning =
    //       `Promise Rejection Handled (id: ${id})\n` +
    //       'This means you can ignore any previous messages of the form ' +
    //       `"Possible Unhandled Promise Rejection (id: ${id}):"`;
    //     console.warn(warning);
    //   },
    // });
    global.Promise = Promise1;
    global.onunhandledrejection = function onunhandledrejection(...e) {
      // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
      // this handler is called a second time by Bluebird with a custom "dom-event".
      // We need to filter this case out:
      // if (error instanceof Error) {
      //   if (__DEV__) {
      //     console.log(`promise unHandle rejection exception:`, error?.stack);
      //   }
      //   cb && cb(error);
      // }
      //["操作失败!", {"fulfillmentValue": undefined, "isFulfilled": false, "isRejected": true, "rejectionReason": "操作失败!"}]
      //[[ReferenceError: as is not defined], {"fulfillmentValue": undefined, "isFulfilled": false, "isRejected": true, "rejectionReason": [ReferenceError: as is not defined]}]
      console.log('eeee = ');
      console.log('eeee = ', e);
    };
    for (let key of Object.keys(global)) {
      let value = global[key];
      console.log('lcc_key_value = ' ,key,value);
    }

    const promise = new Promise((resolve, reject) => {
      as.fun();
      let status = false;
      if (status) {
        resolve('操作成功!');
      } else {
        reject('操作失败!');
      }
    });
    
    promise.then(res => {
      console.log('成功结果：' + res);
    });
  }


  render () {
    const CustomFallback = (props: { error: Error, resetError: Function }) => (
      <View>
        <Text>Something happened!</Text>
        <Text>{props.error.toString()}</Text>
        <Button onPress={props.resetError} title={'Try again'} />
      </View>
    )
    return (
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <ErrorBoundary>
                <BuggyCounter/>
              </ErrorBoundary>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>

      </ErrorBoundary>
    );
  }

  renderStepOne () {
    if (this.state.counter === 5) {
      // Simulate a JS error
      // console.log(xxx)
      throw new Error('I crashed!');
    }
    return (
      <TouchableWithoutFeedback onPress={()=>{
        const counter = this.state.counter + 1;
        this.setState({counter: counter});
      }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step One</Text>
          <Text style={styles.sectionDescription}>
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Text>
        </View>
      </TouchableWithoutFeedback>
      
    )  
  } 
}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;
