import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import drawerContentComponents from './drawerContentComponents';
import AuthScreen from './screens/AuthScreen';
import parentFirstScreen from './screens/parent/FirstScreen';
import parentSecondScreen from './screens/parent/SecondScreen';
import parentThirdScreen from './screens/parent/ThirdScreen';
import parentFourthScreen from './screens/parent/FourthScreen';
import parentFifthScreen from './screens/parent/FifthScreen';
import childFirstScreen from './screens/child/FirstScreen';
import childSecondScreen from './screens/child/SecondScreen';
import childThirdScreen from './screens/child/ThirdScreen';
import childFourthScreen from './screens/child/FourthScreen';
import childFifthScreen from './screens/child/FifthScreen';

const SecondTabIcon = ({ tintColor }) => (
    <Feather name="user" color={tintColor} style={{ fontSize: 20 }} />
);

const FirstTabIcon = ({ tintColor }) => (
    <MaterialCommunityIcons name="playlist-check" color={tintColor} style={{ fontSize: 20 }} />
);

const ThirdTabIcon = ({ tintColor }) => (
    <SimpleLineIcons name="graph" color={tintColor} style={{ fontSize: 20 }} />
);

const FourthTabIcon = ({ tintColor }) => (
    <MaterialIcons name="attach-money" color={tintColor} style={{ fontSize: 20 }} />
);

const FifthTabIcon = ({ tintColor }) => (
    <MaterialCommunityIcons name="gift" color={tintColor} style={{ fontSize: 20 }} />
);

const LogInStack = createStackNavigator({
  auth: { screen: AuthScreen },
  },
  { headerMode: 'screen' }
);

// Child navigator
const childAppStack = createMaterialBottomTabNavigator({
  profile: {
    screen: childSecondScreen,
    navigationOptions: {
      tabBarIcon: SecondTabIcon,
      title: 'Perfil'
    }
  },
  history: {
    screen: childThirdScreen,
    navigationOptions: {
      tabBarIcon: ThirdTabIcon,
      title: 'Ganancias'
    }
  },
  main: {
    screen: childFirstScreen,
    navigationOptions: {
      tabBarIcon: FirstTabIcon,
      title: 'Tareas'
    }
  },
  bank: {
    screen: childFourthScreen,
    navigationOptions: {
      tabBarIcon: FourthTabIcon,
      title: 'Banco'
    }
   },
  reward: {
    screen: childFifthScreen,
    navigationOptions: {
      tabBarIcon: FifthTabIcon,
      title: 'Premios'
    }
   },
  },
  {
    initialRouteName: 'main',
    activeColor: '#ED0F21',
    inactiveColor: '#333333',
    barStyle: { backgroundColor: 'white' },
  }
);

childAppStack.navigationOptions = () => {
  const drawerLockMode = 'locked-closed';
  return {
    drawerLockMode,
  };
};

const drawerChildStack = createDrawerNavigator({
  home: { screen: childAppStack }
}, {
  contentComponent: drawerContentComponents,
}
);
// Parent navigator
const parentAppStack = createMaterialBottomTabNavigator({
  profile: {
    screen: parentSecondScreen,
    navigationOptions: {
      tabBarIcon: SecondTabIcon,
      title: 'Perfil'
    }
  },
  history: {
    screen: parentThirdScreen,
    navigationOptions: {
      tabBarIcon: ThirdTabIcon,
      title: 'Ganancias'
    }
  },
  main: {
    screen: parentFirstScreen,
    navigationOptions: {
      tabBarIcon: FirstTabIcon,
      title: 'Tareas'
    }
  },
  bank: {
    screen: parentFourthScreen,
    navigationOptions: {
      tabBarIcon: FourthTabIcon,
      title: 'Banco'
    }
   },
  reward: {
    screen: parentFifthScreen,
    navigationOptions: {
      tabBarIcon: FifthTabIcon,
      title: 'Premios'
    }
   },
  },
  {
    initialRouteName: 'main',
    activeColor: '#ED0F21',
    inactiveColor: '#333333',
    barStyle: { backgroundColor: 'white' },
  }
);

parentAppStack.navigationOptions = () => {
  const drawerLockMode = 'locked-closed';
  return {
    drawerLockMode,
  };
};

const drawerParentStack = createDrawerNavigator({
  home: { screen: parentAppStack }
}, {
  contentComponent: drawerContentComponents,
}
);

export const Main = createSwitchNavigator({
  logIn: { screen: LogInStack },
  parentApp: { screen: drawerParentStack },
  childApp: { screen: drawerChildStack },
},
{
  navigationOptions: {
    tabBarVisible: false
  },
  lazyLoad: true
});

export const MainNavigator = createAppContainer(Main);
