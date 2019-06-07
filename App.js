import React from 'react';
import * as Font from 'expo-font';
import { View } from 'react-native';
import { MainNavigator } from './src/navigator';

console.disableYellowBox = true;

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./src/assets/OpenSans-Regular.ttf'),
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
      );
  }
}
