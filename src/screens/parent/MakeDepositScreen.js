/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Picker
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import jwtDecode from 'jwt-decode';

import { Navbar, Block, Text, Button } from '../../components';
import { theme } from '../../constants';
import { services } from '../../services';

export default class MakeDepositScreen extends Component {

  state = {
    child: null,
    childName: null,
    amount: 0,
    loading: true,
  }

  async componentWillMount() {
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    this.setState({
      child: this.props.navigation.state.params,
      childName: this.props.navigation.state.params.name || null,
      token,
      loading: false
    });
  }

  handleContribution() {
    // Realizar la misma funcion, cuando el usuario seleccione un miembro al aportar,
    // Debe pasar a la variable child, el ID y el monto
    this.setState({
      loading: true
    });
    const userId = jwtDecode(this.state.token).id;
    services.makeContribution(this.state.token, this.state.child.childId || this.state.child, this.state.amount, userId)
      .then(async res => {
        if (res.data.status === 'success') {
          await AsyncStorage.setItem('@localStorage:token', res.data.token);
          this.props.navigation.navigate('family');
          this.props.navigation.navigate('saving');
        }
        this.setState({
          loading: false
        });
      });
  }

  renderContent() {
    if (this.state.loading) {
       return (<ActivityIndicator color={theme.colors.primary} size="large" />);
    }
    if (this.state.childName) {
      return (
        <Input
          placeholder='Nombre'
          containerStyle={{ width: 200, margin: 10 }}
          inputContainerStyle={{ borderColor: theme.colors.gray3 }}
          value={this.state.childName || ''}
          editable={false}
        />
      );
    }
    return (
      <Picker
        selectedValue={this.state.child}
        style={{ height: 200, width: 300 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ child: itemValue })
        }
      >
        {this.props.navigation.state.params.map((k, i) => this.renderPicker(k, i))}
      </Picker>
    );
  }

  // Renderizar las opciones que puede escoger el usuario, en este caso los niños disponibles
  renderPicker = (child, i) => {
    return <Picker.Item label={child.name} value={child.id} key={i.toString()} />;
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
              <Text h2 bold black>Realizar Aporte</Text>
            </Block>
          </Block>
        </Navbar>
        <Block flex={1} column center middle>
          <Block flex={false} column center middle>
            <Text center size={15}>Selecciona el miembro que quieras aportar</Text>
              {this.renderContent()}
          </Block>
          <Block flex={false} column center>
            <Text center size={15}>Ingresa el monto a depositar</Text>
            <Text center primary size={12}>Mínimo $5.000</Text>
              <Input
                placeholder='$000.000.000'
                containerStyle={{ width: 200, margin: 10 }}
                inputContainerStyle={{ borderColor: theme.colors.gray3 }}
                onChangeText={(amount) => this.setState({ amount })}
              />
          </Block>
          <Block flex={false}>
            <Button
              color={theme.colors.primary}
              style={{ width: theme.window.width * 0.8 }}
              onPress={() => this.handleContribution()}
            >
              {
                this.state.loading ?
                <ActivityIndicator color='white' />
                :
                <Text white bold center>Confirmar aporte</Text>
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
