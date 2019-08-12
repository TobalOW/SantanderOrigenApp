import React from 'react';
import * as Font from 'expo-font';
import { View } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';

import { MainNavigator } from './src/navigator';


console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./src/assets/OpenSans-Regular.ttf'),
    });

    moment.locale('es');

    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={{ flex: 1 }} />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
      );
  }
}
