/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from 'react';
 import {
    StyleSheet,
    View,
    Text,
 } from 'react-native';
 
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 
 export default class AppTest extends Component {
   constructor(props) {
     super(props);
     this.state = { counter: 0 };
   }
   
   componentDidMount() {
       this.renPromiseFun();
   }

   async renPromiseFun () {
    // this.returnPromiseFun().then((data)=>{
    //     console.log('lccdata', data);
    // }).catch(error=>{

    // });
    const a = await this.returnPromiseFun();
    console.log('a');
    console.log('lccdata1');
   }

   returnPromiseFun () {
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject({aaa: '哈哈'});
        }, 1000);
    });
    return promise;
   }

   render () {
     return (
        <View>
        <Text>Something happened!</Text>
        {/* <Button onPress={props.resetError} title={'Try again'} /> */}
        </View>
     );
   }
 }
 
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
 