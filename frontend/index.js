// // /**
// //  * @format
// //  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';

// // // Ignore specific warnings (including precision-related ones)
// // LogBox.ignoreLogs([
// //     'loss of precision', // Adjust this to the exact warning text
// // ]);

// LogBox.ignoreAllLogs(true);
// if (__DEV__) {
//   LogBox.ignoreLogs([
//     'loss of precision',  // Ignore the precision-related warnings
//   ]);
// }



// Wrap the App component with GestureHandlerRootView
const RootComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootComponent);
