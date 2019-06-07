import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import drawerContentComponents from './drawerContentComponents';
import AuthScreen from './screens/AuthScreen';
// import parentMainScreen from './screens/parent/MainScreen';
// import parentProfileScreen from './screens/parent/ProfileScreen';
// import parentHistoryScreen from './screens/parent/HistoryScreen';
// import parentBankScreen from './screens/parent/BankScreen';
// import parentRewardScreen from './screens/parent/RewardScreen';
// import childMainScreen from './screens/child/MainScreen';
// import childProfileScreen from './screens/child/ProfileScreen';
// import childHistoryScreen from './screens/child/HistoryScreen';
// import childBankScreen from './screens/child/BankScreen';
// import childRewardScreen from './screens/child/RewardScreen';

// const ProfileTabIcon = ({ tintColor }) => (
//     <Feather name="user" color={tintColor} style={{ fontSize: 20 }} />
// );
//
// const TaskTabIcon = ({ tintColor }) => (
//     <MaterialCommunityIcons name="playlist-check" color={tintColor} style={{ fontSize: 20 }} />
// );
//
// const HistoryTabIcon = ({ tintColor }) => (
//     <SimpleLineIcons name="graph" color={tintColor} style={{ fontSize: 20 }} />
// );
//
// const BankTabIcon = ({ tintColor }) => (
//     <MaterialIcons name="attach-money" color={tintColor} style={{ fontSize: 20 }} />
// );
//
// const RewardTabIcon = ({ tintColor }) => (
//     <MaterialCommunityIcons name="gift" color={tintColor} style={{ fontSize: 20 }} />
// );

const LogInStack = createStackNavigator({
  auth: { screen: AuthScreen },
},
  { headerMode: 'screen' }
);

// // Child navigator
// const childAppStack = createMaterialBottomTabNavigator({
//   profile: {
//     screen: childProfileScreen,
//     navigationOptions: {
//       tabBarIcon: ProfileTabIcon,
//       title: 'Perfil'
//     }
//   },
//   history: {
//     screen: childHistoryScreen,
//     navigationOptions: {
//       tabBarIcon: HistoryTabIcon,
//       title: 'Ganancias'
//     }
//   },
//   main: {
//     screen: childMainScreen,
//     navigationOptions: {
//       tabBarIcon: TaskTabIcon,
//       title: 'Tareas'
//     }
//   },
//   bank: {
//     screen: childBankScreen,
//     navigationOptions: {
//       tabBarIcon: BankTabIcon,
//       title: 'Banco'
//     }
//    },
//   reward: {
//     screen: childRewardScreen,
//     navigationOptions: {
//       tabBarIcon: RewardTabIcon,
//       title: 'Premios'
//     }
//    },
//   },
//   {
//     initialRouteName: 'main',
//     activeColor: '#ED0F21',
//     inactiveColor: '#333333',
//     barStyle: { backgroundColor: 'white' },
//   }
// );
//
// childAppStack.navigationOptions = () => {
//   const drawerLockMode = 'locked-closed';
//   return {
//     drawerLockMode,
//   };
// };
//
// const drawerChildStack = createDrawerNavigator({
//   home: { screen: childAppStack }
// }, {
//   contentComponent: drawerContentComponents,
// }
// );
// // Parent navigator
// const parentAppStack = createMaterialBottomTabNavigator({
//   profile: {
//     screen: parentProfileScreen,
//     navigationOptions: {
//       tabBarIcon: ProfileTabIcon,
//       title: 'Perfil'
//     }
//   },
//   history: {
//     screen: parentHistoryScreen,
//     navigationOptions: {
//       tabBarIcon: HistoryTabIcon,
//       title: 'Ganancias'
//     }
//   },
//   main: {
//     screen: parentMainScreen,
//     navigationOptions: {
//       tabBarIcon: TaskTabIcon,
//       title: 'Tareas'
//     }
//   },
//   bank: {
//     screen: parentBankScreen,
//     navigationOptions: {
//       tabBarIcon: BankTabIcon,
//       title: 'Banco'
//     }
//    },
//   reward: {
//     screen: parentRewardScreen,
//     navigationOptions: {
//       tabBarIcon: RewardTabIcon,
//       title: 'Premios'
//     }
//    },
//   },
//   {
//     initialRouteName: 'main',
//     activeColor: '#ED0F21',
//     inactiveColor: '#333333',
//     barStyle: { backgroundColor: 'white' },
//   }
// );
//
// parentAppStack.navigationOptions = () => {
//   const drawerLockMode = 'locked-closed';
//   return {
//     drawerLockMode,
//   };
// };
//
// const drawerParentStack = createDrawerNavigator({
//   home: { screen: parentAppStack }
// }, {
//   contentComponent: drawerContentComponents,
// }
// );

export const Main = createSwitchNavigator({
  logIn: { screen: LogInStack },
  // parentApp: { screen: drawerParentStack },
  // childApp: { screen: drawerChildStack },
},
{
  navigationOptions: {
    tabBarVisible: false
  },
  lazyLoad: true
});

export const MainNavigator = createAppContainer(Main);
