/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import jwtDecode from 'jwt-decode';

import { Navbar, Block, Text, Button } from '../../components';
import { theme } from '../../constants';
import { formatCta } from '../../utils';
import { services } from '../../services';

export default class MakeTransferScreen extends Component {
  state = {
    contact: {},
    token: {},
    ammount: ''
  }

  async componentWillMount() {
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    this.setState({
      contact: this.props.navigation.state.params.contact,
      token
    });
  }

  handleTransfer() {
    this.setState({
      loading: true
    });
    services.makeTransfer(this.state.token, jwtDecode(this.state.token).id, this.state.ammount, this.state.contact.id, this.props.navigation.state.params.family)
      .then(res => {
        if (res.data.status === 'success') {
          AsyncStorage.setItem('@localStorage:token', res.data.token);
          this.setState({
            loading: false
          });
          // this hack is because we dont use REDUX
          this.props.navigation.navigate('family');
          this.props.navigation.navigate('transfer');
        }
      })
      .catch(err => console.log(err));
  }

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
              <Text h3 bold black>Transferencia a terceros</Text>
            </Block>
          </Block>
        </Navbar>
        <Block flex={1} column center>
          <Block flex={1} column center middle>
            <Text> Se transferirá a:</Text>
            <Block row flex={false} margin={10} middle>
              <Block style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: theme.colors.gray4 }} middle center flex={false}>
                <MaterialIcons name="person" style={{ fontSize: 20, color: theme.colors.gray3 }} />
              </Block>
              <Block style={{ marginLeft: 15 }} column middle flex={false}>
                <Text semibold>{this.state.contact.name || ''}</Text>
                <Text gray3 caption>{this.state.contact.type || ''}: {formatCta(this.state.contact.number || 123123) || ''}</Text>
              </Block>
            </Block>
          </Block>
          <Block flex={1} column center middle>
            <Text center>Ingresa el monto a depositar</Text>
              <Input
                placeholder='$000.000.000'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(ammount) => this.setState({ ammount })}
                value={this.state.ammount}
              />
          </Block>
          <Block flex={2}>
            <Button
              color={theme.colors.primary}
              style={{ width: theme.window.width * 0.8 }}
              onPress={() => this.handleTransfer()}
            >
            {
              this.state.loading ?
              <ActivityIndicator color='white' />
              :
              <Text white bold center>Confirmar transferencia</Text>
            }
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
