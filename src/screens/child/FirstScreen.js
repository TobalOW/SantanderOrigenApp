/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button } from '../../components';

export default class FirstScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button gradient startColor='#cd2324' endColor='#ff6661' onPress={() => this.props.navigation.openDrawer()}>
              <Text bold white center>Drawer</Text>
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
