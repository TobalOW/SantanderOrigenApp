/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import jwtDecode from 'jwt-decode';

import { Navbar, Block, Text, Card } from '../../components';

import { theme } from '../../constants';
import { services } from '../../services';
import { toClp } from '../../utils';

export default class FirstScreen extends Component {
  state = {
    children: null
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('@localStorage:token');
    const userId = jwtDecode(token).id;
    services.getChildren(token, userId)
      .then(res => this.setState({
        children: res.data.data.children
      }));
  }

  keyExtractor = (item, index) => `list-item-${index}`;

  // RENDERING CARDS THAT CONTAINS CHILD INFO
  renderCards = card => {
    return (
      <Card height={90} pressable onPress={() => this.props.navigation.navigate('resume', card)} margin={[2, 18]} shadow key={`card-${card.id}`}>
        <Block padding={[8, 20]}>
          <Block flex={false} row middle space="between">
            <Text black>{card.first_name} {card.last_name}</Text>
            <MaterialIcons name="chevron-right" style={{ fontSize: 20, color: theme.colors.primary }} />
          </Block>
          <Block flex={false} space='between' row >
            <Block middle>
              <Text darkGray size={11}>{'Saldo'}</Text>
              <Text green size={14} bold style={{ marginTop: 8 }} >+{toClp(card.ammount)}</Text>
            </Block>
            <Block center middle>
              <Text darkGray size={11} center>{'Gastos'}</Text>
              <Text primary bold size={14} style={{ marginTop: 8 }}>-{toClp(card.expenses)}</Text>
            </Block>
            <Block margin={[5, 0]} style={{ alignItems: 'flex-end' }}>
              <Svg
                width="22"
                height="22"
                viewBox="0 0 512 512"
              >
                <Path
                  d="M407.3 197.8c2.3 0 4.6-.3 6.9-.8 10.2-2.3 19.3-10 27.1-22.6l-11.9-7.4c-5.8 9.4-12 14.9-18.3 16.4-4.8 1.1-10.1.1-16-3.1-2.2-89.7-75.8-162.1-166-162.1H200c-13.6 0-27.1 1.7-40.3 4.9C155.4 9.6 142.8 0 128 0H95.6v55c-27.3 22.1-47.1 52.4-56.1 86.1H30c-16.5 0-30 13.5-30 30v14.4c0 16.5 13.5 30 30 30h7.5c6.2 25 20 47.9 39.2 65.2v18.8c0 18.2 14.8 33 33 33h25.2c12.8 0 24.4-7.5 29.8-18.8H219c14 42.7 54.2 73.7 101.6 73.7 58.9 0 106.8-47.9 106.8-106.8 0-30.6-13-58.3-33.7-77.8.4-2.5.6-4.9.9-7.4 4.3 1.6 8.6 2.4 12.7 2.4zM213.8 285v.6c.1 1.4.2 2.9.3 4.3 0 .2 0 .4.1.6.1 1.4.3 2.9.5 4.3 0 .2 0 .3.1.5.2 1.5.4 2.9.7 4.4v.1H160.3l-5.4-.1-1.5 5.2c-2.3 8.1-9.8 13.8-18.3 13.8h-25.2c-10.5 0-19-8.5-19-19v-25.2l-2.5-2.1c-19.7-16.8-33.3-39.9-38.3-65l-1.1-5.6H30c-8.8 0-16-7.2-16-16v-14.4c0-8.8 7.2-16 16-16h20.4l1.3-5.4c7.9-33.9 27.5-64.3 55.1-85.8l2.7-2.1V14H128c10.2 0 18.6 8 19 18.2l.4 9 8.6-2.6c14.2-4.3 28.9-6.4 43.8-6.4h29.1c83.9 0 152.1 68.2 152.1 152.1 0 2.7-.1 5.4-.3 8.1-3.7-2.5-7.5-4.8-11.5-6.8-.1-.1-.3-.1-.4-.2-1.1-.5-2.1-1.1-3.2-1.6-.5-.2-1.1-.5-1.6-.7-.4-.2-.9-.4-1.3-.6-1-.4-2-.9-3-1.3h-.1c-1.1-.4-2.3-.9-3.4-1.3-.1 0-.3-.1-.4-.1-7.3-2.6-15-4.3-22.9-5.3h-.3c-2.5-.3-4.9-.5-7.5-.6h-.8c-1.2 0-2.4-.1-3.6-.1-58.9 0-106.8 47.9-106.8 106.8-.2 1.5-.1 2.9-.1 4.4zm199.6-4.4c0 51.2-41.6 92.8-92.8 92.8-43.1 0-79.3-29.5-89.8-69.3l-.3-1.2c-.1-.4-.2-.8-.3-1.3-.2-.8-.4-1.7-.5-2.5-.1-.3-.1-.6-.2-.9-.1-.6-.2-1.3-.4-1.9-.1-.3-.1-.6-.1-.9l-.3-2.1c0-.2-.1-.4-.1-.6-.1-.9-.2-1.9-.3-2.8v-.4c-.1-.8-.1-1.6-.2-2.4 0-.3 0-.5-.1-.8 0-.7-.1-1.4-.1-2.1v-.8-2.8c0-51.2 41.6-92.8 92.8-92.8 1.3 0 2.6 0 3.9.1h.4c1.3.1 2.6.1 3.8.3h.4c1.3.1 2.6.3 4 .4 5.5.7 10.8 2 16.1 3.7.1 0 .1 0 .2.1 1.2.4 2.4.8 3.6 1.3.2.1.3.1.5.2 1.1.4 2.2.9 3.3 1.3.3.1.6.2.8.4.8.3 1.6.7 2.4 1.1.6.3 1.3.6 1.9.9.5.2 1 .5 1.5.7 1.1.6 2.2 1.1 3.2 1.8.1 0 .2.1.3.1 27.6 15.9 46.4 46 46.4 80.4z"
                  fill={card.contribution ? theme.colors.primary : theme.colors.gray}
                />
                <Path
                  d="M113.6 119.9c0-5.2 3-9.7 7.4-11.8-2.3-.8-4.8-1.3-7.4-1.3-12.1 0-21.9 9.8-21.9 21.9s9.8 21.9 21.9 21.9c11.8 0 21.5-9.4 21.9-21.1-2.3 2.1-5.4 3.5-8.8 3.5-7.3-.1-13.1-5.9-13.1-13.1zM319.2 257.4c1.5-1.1 3.9-1.6 7-1.2 7.6.9 11.9 4 13.9 5.6l6.6 4.9 11.1-21.5-4.7-3.6c-4.2-3.2-9-5.5-14.4-7l1.7-14.4-22.7-2.6-1.8 15.8c-13.5 2.8-23.1 12.6-24.6 25.8-2 17.7 11.1 27.2 24.1 34.1 10.3 5.6 10.8 9 10.5 11.8-.6 5.1-6.1 6.3-10.7 5.8-5.7-.7-11.7-3.2-16-6.8l-6.8-5.8-10.8 21.9 3.9 3.5c4.4 4 10.9 7.2 17.9 9.1l-1.7 14.9 22.8 2.6 1.9-16.2c14.1-2.8 24.2-13.1 25.8-26.9 2.2-19.2-10.9-29-22.5-35.4-12.6-7-12.4-9.2-12.1-11.2 0-.8.3-2.2 1.6-3.2z"
                  fill={card.contribution ? theme.colors.primary : theme.colors.gray}
                />
              </Svg>
              <Text darkGray size={11} right>{'Mesada'}</Text>
              <Text darkGray size={13} right>{toClp(card.monthlyPayment)}</Text>
            </Block>
          </Block>
        </Block>
      </Card>
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
              <Text h2 bold black>Mi Santander</Text>
              <Text h2 bold black>Familia</Text>
            </Block>
          </Block>
        </Navbar>
        <Block padding={5}>
          <Block flex={false} center margin={10}>
            <Text semibold black shadow size={16}>Familia Perez - Agosto 2019</Text>
          </Block>
          <Block flex={1}>
            {
              this.state.children ?
              <FlatList
                data={this.state.children}
                renderItem={({ item }) => this.renderCards(item)}
                keyExtractor={this.keyExtractor}
              /> :
              <ActivityIndicator sieze="large" color={theme.colors.primary} />
            }
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
  thumb: {
    width: theme.sizes.base / 2,
    height: theme.sizes.base / 2,
    borderRadius: theme.sizes.base / 2,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: theme.colors.secondary,
  },
  overlay: {
    height: 50,
    width: 130,
    borderRadius: 20,
  },
});
