import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';

import drawerContentComponents from './drawerContentComponents';
import AuthScreen from './screens/AuthScreen';

import parentFamilyScreen from './screens/parent/FamilyScreen';
import parentBagScreen from './screens/parent/BagScreen';
import parentSavingScreen from './screens/parent/SavingScreen';
import parentTransferScreen from './screens/parent/TransferScreen';
import ResumeChildScreen from './screens/parent/ResumeChildScreen';
import MovementsDetailScreen from './screens/parent/MovementsDetailScreen';
import MovementsDetailScreen2 from './screens/parent/MovementsDetailScreen2';
import SpentDetailScreen from './screens/parent/SpentDetailScreen';
import ModifyMesadaScreen from './screens/parent/ModifyMesadaScreen';
import NewContactScreen from './screens/parent/NewContactScreen';
import ModifyMaxScreen from './screens/parent/ModifyMaxScreen';
import InvestDetailScreen from './screens/parent/InvestDetailScreen';
import MakeDepositScreen from './screens/parent/MakeDepositScreen';
import parentMakeTransferScreen from './screens/parent/MakeTransferScreen';

import childFirstScreen from './screens/child/FirstScreen';
import childSecondScreen from './screens/child/SecondScreen';
import childThirdScreen from './screens/child/ThirdScreen';
import childFourthScreen from './screens/child/FourthScreen';
import childFifthScreen from './screens/child/FifthScreen';


// Iconos del tab navigator
const FirstTabIcon = ({ tintColor }) => (
    <FA name="users" color={tintColor} style={{ fontSize: 20 }} />
);

const SecondTabIcon = ({ tintColor }) => (
    <MaterialCommunityIcons name="wallet" color={tintColor} style={{ fontSize: 20 }} />
);

const ThirdTabIcon = ({ tintColor }) => (
    <FA name="line-chart" color={tintColor} style={{ fontSize: 20 }} />
);

const FourthTabIcon = ({ tintColor }) => (
    <FA name="exchange" color={tintColor} style={{ fontSize: 20 }} />
);

const FifthTabIcon = ({ tintColor }) => (
    <MaterialCommunityIcons name="gift" color={tintColor} style={{ fontSize: 20 }} />
);

const LogInStack = createStackNavigator({
  auth: { screen: AuthScreen },
  },
  { headerMode: 'screen' }
);

// Child navigator (no usado en esta etapa)
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
// Las navegaciones utilizadas son, Drawer, Stack y Tab Navigators


// Navegacion Familia con stack Navigator
const familyStackNavigator = createStackNavigator({
  main: { screen: parentFamilyScreen },
  resume: { screen: ResumeChildScreen },
  detail: { screen: MovementsDetailScreen },
  modifyMesadaFamily: { screen: ModifyMesadaScreen },
},
{
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'main',
});


// No usada
const bagStackNavigator = createStackNavigator({
  main: { screen: parentBagScreen },
  detailSpent: { screen: SpentDetailScreen },
  detailMovements: { screen: MovementsDetailScreen2 },
  modifyMax: { screen: ModifyMaxScreen }
},
{
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'main',
});

// Navegacion Transferencia con stack Navigator
const transferStackNavigator = createStackNavigator({
  main: { screen: parentTransferScreen },
  transfer: { screen: parentMakeTransferScreen },
  newContact: { screen: NewContactScreen }
},
{
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'main',
});

// Navegacion Ahorro con stack Navigator
const savingStackNavigator = createStackNavigator({
  mainSaving: { screen: parentSavingScreen },
  investDetail: { screen: InvestDetailScreen },
  makeDeposit: { screen: MakeDepositScreen }
},
{
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'mainSaving',
});

// Navegacion completa de aplicacion para padres
const parentAppStack = createBottomTabNavigator({
  family: {
    screen: familyStackNavigator,
    navigationOptions: {
      tabBarIcon: FirstTabIcon,
      title: 'Familia'
    }
  },
  saving: {
    screen: savingStackNavigator,
    navigationOptions: {
      tabBarIcon: ThirdTabIcon,
      title: 'Ahorro'
    }
  },
  transfer: {
    screen: transferStackNavigator,
    navigationOptions: {
      tabBarIcon: FourthTabIcon,
      title: 'Transferencia'
    }
   },
 }, {
   initialRouteName: 'family',
   resetOnBlur: true,
   tabBarOptions: {
     activeTintColor: '#ED0F21',
     inactiveTintColor: '#CCCCCC',
     labelStyle: {
       fontSize: 12,
     },
     tabStyle: {
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
     },
     style: {
       backgroundColor: 'white',
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
       borderWidth: 0.5,
       borderColor: '#f2f2f2',
       shadowColor: '#1C202E',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 13,
       elevation: 2,
       height: 55,
       margin: 0,
       padding: 0,
     },
   }
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

// Navegacion de App completa
// Recordar que no se usa la navegacion de ChildApp por alcance de proyecto
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
