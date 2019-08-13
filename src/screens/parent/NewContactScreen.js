/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Picker,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import jwtDecode from 'jwt-decode';

import { services } from '../../services';
import { Navbar, Block, Text, Button } from '../../components';
import { theme } from '../../constants';

export default class NewContactScreen extends Component {
  state = {
    name: '',
    token: '',
    rut: '',
    bank: '',
    typeId: 1,
    number: '',
    loading: false
  }

  async componentWillMount() {
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    this.setState({
      token
    });
  }

  handleAddContact() {
    this.setState({
      loading: true
    });
    const userId = jwtDecode(this.state.token).id;
    const { name, number, token, typeId, rut, bank } = this.state;
    services.addContact(userId, name, number, token, typeId, rut, `Banco ${bank}`)
      .then(res => {
        console.log(JSON.stringify(res.data));
        if (res.data.status === 'success') {
          this.setState({
            loading: false
          });
          this.props.navigation.navigate('family');
          this.props.navigation.navigate('transfer');
        }
      })
      .catch(err => console.log(JSON.stringify(err)));
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
              <Text h2 bold black>Nuevo contacto</Text>
            </Block>
          </Block>
        </Navbar>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingTop: 15, paddingBottom: 15 }}>
          <Block flex={false} column center middle>
            <Text center size={15}>Nombre del contacto</Text>
              <Input
                placeholder='Nombre'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              />
          </Block>
          <Block flex={false} column center>
            <Text center size={15}>RUT</Text>
              <Input
                placeholder='00.000.000-0'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(rut) => this.setState({ rut })}
                value={this.state.rut}
              />
          </Block>
          <Block flex={false} column center middle>
            <Text center size={15}>Banco</Text>
              <Input
                placeholder='Santander'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(bank) => this.setState({ bank })}
                value={this.state.bank}
              />
          </Block>
          <Block flex={false} column center middle>
            <Text center size={15}>Tipo de cuenta</Text>
            <Block style={{ height: 200 }} flex={false}>
              <Picker
                selectedValue={this.state.typeId}
                style={{ height: 150, width: 300, marginTop: 0, paddingTop: 0 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ typeId: itemValue })
                }
              >
                <Picker.Item label={'Cuenta Corriente'} value={1} />
                <Picker.Item label={'Cuenta Vista'} value={2} />
              </Picker>
            </Block>
          </Block>
          <Block flex={false} column center middle>
            <Text center size={15}>Número de cuenta</Text>
              <Input
                placeholder='000000000'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(number) => this.setState({ number })}
                value={this.state.number}
                maxLength={8}
              />
          </Block>
          <Block flex={false}>
            <Button
              color={theme.colors.primary}
              style={{ width: theme.window.width * 0.8 }}
              onPress={() => this.handleAddContact()}
            >
              {
                this.state.loading ?
                <ActivityIndicator color='white' />
                : <Text white bold center>Añadir contacto</Text>
              }
            </Button>
          </Block>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
