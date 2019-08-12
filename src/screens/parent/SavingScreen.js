/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { Navbar, Block, Text, Card, Button } from '../../components';
import { theme } from '../../constants';
import { services } from '../../services';
import { toClp } from '../../utils';

export default class ThirdScreen extends Component {

  state = {
    name: 'TobalOW',
    currentAmount: null,
    childAccounts: null
  }

  async componentWillMount() {
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    const tokenInfo = jwtDecode(token);
    this.setState({
      name: tokenInfo.name,
      currentAmount: tokenInfo.vistaAccount,
    });
    services.getSavingAccounts(token, tokenInfo.id)
      .then(res =>
        this.setState({
          childAccounts: res.data.data.children,
        })
      );
  }

  keyExtractor = (item, index) => item.id;

  // Renderiza las cards de los niños en la seccion ahorro
  renderCards = card => {
    return (
      <Card
        height={90}
        pressable
        onPress={() => this.props.navigation.navigate('investDetail', {
          name: card.name,
          contributions: card.contributions,
          ammount: card.ammount,
          childId: card.id
        })}
        shadow
        key={`card-${card.id}`}
      >
        <Block padding={20} row space="between" flex={1}>
          <Block column>
            <Text black>{card.name}</Text>
            <Text darkGray>Invertido</Text>
            <Text h3 bold>{toClp(card.ammount)}</Text>
          </Block>
          <Block column style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
            <MaterialIcons name="chevron-right" style={{ fontSize: 20, color: theme.colors.primary }} />
            <Text darkGray>Último aporte</Text>
              <Text black bold>
                {
                  card.contributions.reverse()[0] ?
                  toClp(card.contributions.reverse()[0].ammount)
                  :
                  'No hay aportes'
                }
              </Text>
            <Text darkGray>
              {
                card.contributions.reverse()[0] ?
                (
                  moment(card.contributions.reverse()[0].date).utcOffset(0, true).fromNow()
                )
                :
                ''
              }
            </Text>
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
                  <Text bold white>{toClp(this.state.currentAmount)}</Text>
                  <Text caption white>{'Saldo Actual'}</Text>
                </Block>
              </LinearGradient>
            </Block>
          </Block>
        </Navbar>
        <Block flex={1} padding={[0, 20]}>
          <Block flex={false}>
            <Button
              color={theme.colors.primary}
              onPress={() => this.props.navigation.navigate('makeDeposit', this.state.childAccounts)}
            >
              <Text bold white center size={16}>Realizar nuevo aporte</Text>
            </Button>
          </Block>
          <Block>
            {
              this.state.childAccounts ?
              <FlatList
                data={this.state.childAccounts}
                renderItem={({ item }) => this.renderCards(item)}
                keyExtractor={this.keyExtractor}
              />
              :
              <ActivityIndicator color={theme.colors.primary} size="large" />
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
  overlay: {
    height: 50,
    width: 130,
    borderRadius: 20,
  },
});
