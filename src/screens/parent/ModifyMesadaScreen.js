// DUMMY COMPONENT
/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';

import { Navbar, Block, Text, Button } from '../../components';
import { theme } from '../../constants';

export default class ModifyMesadaScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 90 }}>
          <Block row flex={1} padding={10}>
            <Block middle flex={false}>
              <MaterialIcons
                name="arrow-back"
                style={{ fontSize: 20, color: theme.colors.primary }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Block>
            <Block flex={false} style={{ marginLeft: 15, marginTop: 3 }}>
              <Text h3 bold black>Modificar Mesada</Text>
            </Block>
          </Block>
        </Navbar>
        <Block center middle>
          <Block center middle>
            <Text size={15} black center semibold>
              Al modificar la mesada, se reemplazará automáticamente la mesada actual por la que determines.
            </Text>
          </Block>
          <Block column center middle>
            <Text center darkGray>Nuevo monto de mesada</Text>
              <Input
                placeholder='$000.000.000'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
              />
          </Block>
          <Block column center middle>
            <Text center darkGray>Nuevo día de mesada</Text>
              <Input
                placeholder='00'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
              />
          </Block>
          <Block flex={2}>
            <Button
              color={theme.colors.primary}
              style={{ width: theme.window.width * 0.8 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text white bold center>Confirmar mesada</Text>
            </Button>
          </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
