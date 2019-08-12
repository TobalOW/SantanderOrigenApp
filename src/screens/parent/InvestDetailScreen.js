/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import { Navbar, Block, Text, Button, Card } from '../../components';
import { theme } from '../../constants';
import { toClp } from '../../utils';


export default class InvestDetailScreen extends Component {
  state = {
    name: 'TobalOW',
    contributions: null
  }

  async componentWillMount() {
    const { name, contributions, ammount } = this.props.navigation.state.params;
    this.setState({
      name,
      contributions,
      ammount
    });
  }

  // I WILL MAKE A CARD BUT TRANSPARENT THAT LOOKS SIMILAR TO THE MOCKUP
  transparentCard(movement) {
    return (
      <Block style={{ height: 65 }} column padding={[5, 30]} flex={false}>
        <Block flex={false} row>
          <Block column flex={1}>
            <Text size={14} black>{movement.name || 'Sin nombre'}</Text>
            <Text size={13} darkGray>
              {
                moment(
                  movement.date
                )
                .utcOffset(-8)
                .format('DD/MM/YYYY [a las] HH:mm')
              }
            </Text>
          </Block>
          <Block column middle style={{ alignItems: 'flex-end', marginTop: 3 }} flex={false}>
            <Text size={13} darkGray>{toClp(movement.ammount)}</Text>
          </Block>
        </Block>
        <Block flex={false} style={{ backgroundColor: '#979797', height: 1 }} />
      </Block>
    );
  }

  keyExtractor = (item, index) => item.id;

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
              <Text h2 bold black>{this.state.name}</Text>
            </Block>
          </Block>
        </Navbar>
        <Block padding={[0, 20]} flex={false}>
          <Block flex={false}>
            <Button
              color={theme.colors.primary}
              onPress={() => this.props.navigation.navigate('makeDeposit', this.props.navigation.state.params)}
            >
              <Text bold white center size={16}>Realizar nuevo aporte</Text>
            </Button>
          </Block>
          <Card height={90} shadow flex={false}>
            <Block middle center flex={1}>
              <Text>Total invertido</Text>
              <Text size={18} bold>{toClp(this.state.ammount)}</Text>
            </Block>
          </Card>
        </Block>
        <Block flex={1}>
          <Block flex={false} center margin={10}>
            <Text semibold black shadow size={16}>Historial de Aportes</Text>
          </Block>
          {
            this.state.contributions.length > 0 ?
            <FlatList
              data={this.state.contributions}
              renderItem={({ item }) => this.transparentCard(item)}
              keyExtractor={this.keyExtractor}
            />
            :
            <Text center>No hay aportes realizados</Text>
          }
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
