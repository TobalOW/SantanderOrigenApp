/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jwtDecode from 'jwt-decode';

import { Navbar, Block, Text, Button } from '../../components';
import { theme } from '../../constants';
import { services } from '../../services';
import { toClp, formatCta } from '../../utils';

export default class FourthScreen extends Component {
  state = {
    name: 'TobalOW',
    dataFamily: null,
    dataContacts: null,
    currentAmount: null
  }

  async componentWillMount() {
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    const currentAmount = toClp(jwtDecode(token).vistaAccount);
    this.setState({
      name: jwtDecode(await AsyncStorage.getItem('@localStorage:token')).name,
      currentAmount
    });
    services.getTransferList(token, jwtDecode(token).id)
      .then(res => {
        this.setState({
          dataFamily: res.data.data.family,
          dataContacts: res.data.data.contacts
        });
      });
  }

  content() {
    return (
      <ScrollView flex={1} style={{ marginTop: 5 }}>
        <Block flex={1} padding={[10, 20]}>
          <Text bold>Familia</Text>
            {
              this.state.dataFamily ?
              this.state.dataFamily.map((k) => this.cardContactFamily(k))
              :
              <ActivityIndicator sieze="large" color={theme.colors.primary} />
            }
        </Block>
        <Block flex={1} padding={[10, 20]}>
          <Text bold>Contactos</Text>
          {
            this.state.dataFamily ?
            this.state.dataContacts.map((k) => this.cardContact(k))
            :
            <ActivityIndicator sieze="large" color={theme.colors.primary} />
          }
        </Block>
      </ScrollView>
    );
  }


  // Se deben hacer 2 card contact por que deben ir en el mismo scrollview con distintos estilos
  cardContactFamily(contact) {
    return (
      <Block key={`${contact.name}${contact.id}`}row flex={false} margin={10} pressable onPress={() => this.props.navigation.navigate('transfer', { contact, family: true })}>
        <Block style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: theme.colors.gray4 }} middle center flex={false}>
          <MaterialIcons name="person" style={{ fontSize: 25, color: theme.colors.gray3 }} />
        </Block>
        <Block style={{ marginLeft: 15 }} column middle>
          <Text semibold>{contact.name}</Text>
          <Text gray3 size={10} style={{ marginTop: 2, marginBottom: 1 }}>{contact.bank}</Text>
          <Text gray3 caption>{contact.type}: {formatCta(contact.number)}</Text>
        </Block>
      </Block>
    );
  }

  cardContact(contact) {
    return (
      <Block key={`${contact.name}${contact.id}`}row flex={false} margin={10} pressable onPress={() => this.props.navigation.navigate('transfer', { contact, family: false })}>
        <Block style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: theme.colors.gray4 }} middle center flex={false}>
          <MaterialIcons name="person" style={{ fontSize: 25, color: theme.colors.gray3 }} />
        </Block>
        <Block style={{ marginLeft: 15 }} column middle>
          <Text semibold>{contact.name}</Text>
          <Text gray3 size={10} style={{ marginTop: 2, marginBottom: 1 }}>{contact.bank}</Text>
          <Text gray3 caption>{contact.type}: {formatCta(contact.number)}</Text>
        </Block>
      </Block>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 90 }}>
          <Block row flex={1} padding={10}>
            <Block middle flex={false} pressable onPress={() => this.props.navigation.openDrawer()}>
              <MaterialIcons name="menu" style={{ fontSize: 20, color: theme.colors.primary }} />
            </Block>
            <Block flex={false} style={{ marginLeft: 15, marginTop: 3 }}>
              <Text h2 bold black>{this.state.name}</Text>
            </Block>
            <Block center bigShadow style={{ alignItems: 'flex-end' }}>
              <LinearGradient
                end={{ x: 1, y: 0.5 }}
                start={{ x: 0, y: 0.5 }}
                style={styles.overlay}
                colors={['#EA1D25', '#FF1E1E']}
              >
                <Block center middle>
                  <Text bold white>{this.state.currentAmount}</Text>
                  <Text caption white>{'Saldo Actual'}</Text>
                </Block>
              </LinearGradient>
            </Block>
          </Block>
        </Navbar>
        <Block flex={false} center margin={10}>
          <Text semibold black size={16}>¿A quién deseas transferir?</Text>
        </Block>
        <Block flex={false} margin={[0, 30]} >
          <Button
            color={theme.colors.primary}
            style={{ height: 40 }}
            onPress={() => this.props.navigation.navigate('newContact')}
          >
            <Text white center size={12} bold>Nuevo Contacto</Text>
          </Button>
        </Block>
        <Block flex={false} margin={[0, 30]} style={{ height: 40, backgroundColor: 'white', borderRadius: 20 }} middle shadow>
          <Text center darkGray size={13}>Buscar contacto</Text>
        </Block>
        {this.content()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    height: 50,
    width: 130,
    borderRadius: 20,
  },
});
