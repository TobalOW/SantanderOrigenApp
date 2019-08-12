import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Dimensions, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jwtDecode from 'jwt-decode';


const window = Dimensions.get('window');
const TOP_DRAWER = window.height * 0.2;
const DOWN_DRAWER = window.height * 0.8;

import { theme } from './constants';


class drawerContentComponents extends Component {
  state = {
    name: 'TobalOW'
  }
  async componentWillMount() {
    this.setState({
      name: jwtDecode(await AsyncStorage.getItem('@localStorage:token')).name
    });
  }

  async onLogOut() {
    this.props.navigation.navigate('logIn', { fromLogout: true });
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logOut() {
    Alert.alert(
      '¿Estás seguro?',
      'Se cerrará tu sesión actual',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Si', onPress: () => this.onLogOut() },
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.topStyle}
        >
          <Text
            style={styles.displayNameStyle}
          >
            {this.state.name}
          </Text>
          <View style={{ width: 180, height: 1, backgroundColor: 'white', marginTop: 10 }} />
        </View>
        <ScrollView style={{ height: DOWN_DRAWER, paddingTop: 10 }}>
          <View style={styles.navSectionStyle}>
            <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ color: theme.colors.darkGray, fontSize: 15 }}>
                Administrar Familia
              </Text>
              <MaterialIcons name="keyboard-arrow-right" style={{ fontSize: 20, color: theme.colors.primary }} />
            </View>
            <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ color: theme.colors.darkGray, fontSize: 15 }}>
                Bloqueo de tarjetas
              </Text>
              <MaterialIcons name="keyboard-arrow-right" style={{ fontSize: 20, color: theme.colors.primary }} />
            </View>
            <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ color: theme.colors.darkGray, fontSize: 15 }}>
                Preguntas frecuentes
              </Text>
              <MaterialIcons name="keyboard-arrow-right" style={{ fontSize: 20, color: theme.colors.primary }} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => this.logOut()}
            style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}
          >
            <Text style={{ fontSize: 15, color: theme.colors.primary }}>
              Salir
            </Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ color: theme.colors.darkGray, fontSize: 11 }}>Santander Familia Beta v{ Constants.manifest.version }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayNameStyle: {
    textAlign: 'center',
    width: 200,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  topStyle: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    height: TOP_DRAWER,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 5
  },
  navSectionStyle: {
    backgroundColor: 'white',
    paddingTop: 20
  },
  footerContainer: {
    flexDirection: 'column',
    padding: 5,
  },
});


export default drawerContentComponents;
